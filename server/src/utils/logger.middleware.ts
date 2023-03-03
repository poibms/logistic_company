import { FilesService } from 'src/files/files.service';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private fileService: FilesService) {}
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.fileService.logFile(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      if (statusCode >= 500) {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      }
    });

    next();
  }
}
