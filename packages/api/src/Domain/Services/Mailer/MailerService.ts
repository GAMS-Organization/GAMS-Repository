import UserService from '../UserService';
import { inject, injectable } from 'inversify';
import User from '../../Entities/User';
import WorkOrder from '../../Entities/WorkOrder';

@injectable()
export default class MailerService {
  private userService: UserService;
  private sgMail = require('@sendgrid/mail');

  public constructor(@inject(UserService) userService: UserService) {
    this.userService = userService;
    this.sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public async sendEmail(subject: string, workOrder: WorkOrder, type: string, userId?: number[]) {
    const recipient = await this.getRecipientMail(userId);
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
      text: this.getCustomMessage(type, workOrder),
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

  private async getRecipientMail(usersId?: number[]) {
    const user: User[] = [];
    if (usersId) {
      for (const userId of usersId) {
        const userFound: User = await this.userService.findOneById(userId);
        user.push(userFound);
      }
    }
    const recipient: string[] = [];
    if (user.length !== 0) {
      user.forEach(user => {
        recipient.push(user.getEmail());
      });
    } else {
      const users: User[] = await this.userService.findByRole('personal');
      console.log(users);
      users.forEach(user => {
        recipient.push(user.getEmail());
      });
    }
    return recipient;
  }

  private getCustomMessage(type: string, workOrder: WorkOrder): string {
    let message: string = '';
    switch (type) {
      case 'newWorkOrder':
        message =
          `El elemento ${workOrder
            .getAsset()
            .getElement()
            .getName()} que se encuentra dentro del sector ` +
          `${workOrder
            .getAsset()
            .getSector()
            .getName()}, área ${workOrder
            .getAsset()
            .getArea()
            .getName()}, le ha ` +
          `sido asignada una nueva órden de trabajo.` +
          `El usuario ${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()} ha dejado el siguiente ` +
          `comentario: ${workOrder.getComment()}. Código del activo correspondiente: ${workOrder.getAsset().getCode()}`;
        break;
      case 'asignWorkOrder':
        message =
          `Te ha sido asignada una orden de trabajo` +
          ' ' +
          `El elemento ${workOrder
            .getAsset()
            .getElement()
            .getName()} que se encuentra dentro del sector ` +
          `${workOrder
            .getAsset()
            .getSector()
            .getName()}, área ${workOrder
            .getAsset()
            .getArea()
            .getName()}, le ha ` +
          `sido asignada una nueva órden de trabajo.` +
          `El usuario ${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()} ha dejado el siguiente ` +
          `comentario: ${workOrder.getComment()}. Código del activo correspondiente: ${workOrder.getAsset().getCode()}`;
        break;
      case 'takeWorkOrder':
        message =
          `Una orden de trabajo ha sido tomada por ${workOrder
            .getUserWorkOrders()[0]
            .getUser()
            .getName()} ${workOrder
            .getUserWorkOrders()[0]
            .getUser()
            .getSurname()} ` +
          ' ' +
          `El elemento ${workOrder
            .getAsset()
            .getElement()
            .getName()} que se encuentra dentro del sector ` +
          `${workOrder
            .getAsset()
            .getSector()
            .getName()}, área ${workOrder
            .getAsset()
            .getArea()
            .getName()}, le ha ` +
          `sido asignada una nueva órden de trabajo.` +
          `El usuario ${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()} ha dejado el siguiente ` +
          `comentario: ${workOrder.getComment()}. Código del activo correspondiente: ${workOrder.getAsset().getCode()}`;
        break;
      case 'completeWorkOrder':
        message =
          `La orden de trabajo ha sido completada` +
          ' ' +
          `El elemento ${workOrder
            .getAsset()
            .getElement()
            .getName()} que se encuentra dentro del sector ` +
          `${workOrder
            .getAsset()
            .getSector()
            .getName()}, área ${workOrder
            .getAsset()
            .getArea()
            .getName()}, le ha ` +
          `sido asignada una nueva órden de trabajo.` +
          `El usuario ${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()} ha dejado el siguiente ` +
          `comentario: ${workOrder.getComment()}. Código del activo correspondiente: ${workOrder.getAsset().getCode()}`;
        break;
      default:
        break;
    }
    return message;
  }
}
