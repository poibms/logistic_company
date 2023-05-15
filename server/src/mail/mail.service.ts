import { Orders } from 'src/orders/orders.entity';
import { Drivers } from './../drivers/drivers.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async driverCredsNotification(driver: Drivers, password: string) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  async userCreateOrderNotify(order: Orders) {
    await this.mailService.sendMail({
      to: order.ownerId.email,
      from: process.env.SMTP_USER,
      subject: 'Create account',
      text: '',
      html: `<h1>Thanks for creation order</h1>
    <p>Your track code: ${order.track_code} </p>`,
    });
  }
}
