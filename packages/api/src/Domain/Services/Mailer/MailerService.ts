import UserService from '../UserService';
import { inject, injectable } from 'inversify';
import User from '../../Entities/User';

@injectable()
export default class MailerService {
  private userService: UserService;
  private sgMail = require('@sendgrid/mail');

  public constructor(@inject(UserService) userService: UserService) {
    this.userService = userService;
    this.sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public async sendEmail(subject: string, message: string, user?: User[]) {
    const recipient = await this.getRecipientMail(user);
    //Recipient contiene el/los email del destinatario
    console.log(
      '----------------------------------------------------------------------',
      recipient,
      '----------------------------------------------------------------------',
    );
    const msg = {
      to: process.env.RECIPIENT_EMAIL_TEST, // Cambiar por recipient
      from: process.env.EMAIL_SENDER, // Change to your verified sender
      subject: subject,
      text: message,
    };
    this.sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch(error => {
        console.error(error);
      });
  }

  private async getRecipientMail(user?: User[]) {
    const recipient: string[] = [];
    if (user) {
      user.forEach(user => {
        recipient.push(user.getEmail());
      });
    } else {
      const users: User[] = await this.userService.findByRole('personal');
      users.forEach(user => {
        recipient.push(user.getEmail());
      });
    }
    return recipient;
  }
}
