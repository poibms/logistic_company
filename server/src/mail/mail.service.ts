import { Drivers } from './../drivers/drivers.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async driverCredsNotification(driver: Drivers, password: string) {
    await this.mailService.sendMail({
      to: driver.email,
      from: process.env.SMTP_USER,
      subject: 'Create account',
      text: '',
      html: `<h1>Hi ${driver.name} ${driver.surname}</h1>
    <p>Your credentionals for log in in mobile app: </p>
    <p>Email: ${driver.email}</p>
    <p>Passsword: ${password}</p>`,
    });
    return 'success';
  }
}
