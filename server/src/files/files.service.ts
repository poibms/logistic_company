import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { FileType } from 'src/types/files.types';
import { EOL } from 'os';

@Injectable()
export class FilesService {
  async createFile(type: FileType, file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      // throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      console.log(e);
    }
  }

  logFile(log: string): void {
    try {
      const curDate = new Date().toJSON().slice(0, 10);
      const fileName = curDate + '.' + 'log';
      const filePath = path.resolve('logs');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      console.log(path.resolve(filePath, fileName), log);
      fs.appendFileSync(path.resolve(filePath, fileName), `${EOL}${log}`);
      console.log('a');
    } catch (e) {
      // throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      console.log(e);
    }
  }
}
