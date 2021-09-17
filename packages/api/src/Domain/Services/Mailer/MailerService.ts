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
  //@ts-ignore
  public async sendEmail(subject: string, workOrder: WorkOrder, type: string, userId?: number[]) {
    //Recipient contiene el/los email del destinatario
    const { dynamicTemplateData, templateId } = this.getCustomMessage(type, workOrder);
    const msg = {
      from: process.env.EMAIL_SENDER, // Change to your verified sender
      subject: subject,
      templateId: templateId,
      personalizations: [
        {
          to: [
            {
              email: process.env.RECIPIENT_EMAIL_TEST, // Cambiar por recipient
            },
          ],
          dynamicTemplateData: dynamicTemplateData,
        },
      ],
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
  //@ts-ignore
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
      users.forEach(user => {
        recipient.push(user.getEmail());
      });
    }
    return recipient;
  }

  private getCustomMessage(type: string, workOrder: WorkOrder): { dynamicTemplateData: object; templateId: string } {
    let dynamicTemplateData: object;
    let templateId: string;
    switch (type) {
      case 'newWorkOrder':
        dynamicTemplateData = {
          author: `${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()}`,
          element: workOrder
            .getAsset()
            .getElement()
            .getName(),
          sector: workOrder
            .getAsset()
            .getSector()
            .getName(),
          area: workOrder
            .getAsset()
            .getArea()
            .getName(),
          comment: workOrder.getComment(),
          asset: workOrder.getAsset().getCode(),
          priority: workOrder.getPriority(),
          orderDate: workOrder.getOrderDate(),
        };
        templateId = process.env.MAIL_TEMPLATE_CREATE_ID;
        break;
      case 'assignWorkOrder':
        dynamicTemplateData = {
          author: `${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()}`,
          element: workOrder
            .getAsset()
            .getElement()
            .getName(),
          sector: workOrder
            .getAsset()
            .getSector()
            .getName(),
          area: workOrder
            .getAsset()
            .getArea()
            .getName(),
          comment: workOrder.getComment(),
          asset: workOrder.getAsset().getCode(),
          priority: workOrder.getPriority(),
          workers: workOrder.getWorkersNameByUserWorkOrders().join(', '),
          orderDate: workOrder.getOrderDate(),
          startDate: workOrder.getStartDate(),
        };
        templateId = process.env.MAIL_TEMPLATE_ASSIGN_ID;
        break;
      case 'takeWorkOrder':
        dynamicTemplateData = {
          author: `${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()}`,
          element: workOrder
            .getAsset()
            .getElement()
            .getName(),
          sector: workOrder
            .getAsset()
            .getSector()
            .getName(),
          area: workOrder
            .getAsset()
            .getArea()
            .getName(),
          comment: workOrder.getComment(),
          asset: workOrder.getAsset().getCode(),
          priority: workOrder.getPriority(),
          workers: workOrder.getWorkersNameByUserWorkOrders().join(', '),
          orderDate: workOrder.getOrderDate(),
          startDate: workOrder.getStartDate(),
        };
        templateId = process.env.MAIL_TEMPLATE_TAKE_ID;
        break;
      case 'cancelWorkOrder':
        dynamicTemplateData = {
          author: `${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()}`,
          element: workOrder
            .getAsset()
            .getElement()
            .getName(),
          sector: workOrder
            .getAsset()
            .getSector()
            .getName(),
          area: workOrder
            .getAsset()
            .getArea()
            .getName(),
          comment: workOrder.getComment(),
          asset: workOrder.getAsset().getCode(),
          taskDescription: workOrder.getTaskDescription(),
        };
        templateId = process.env.MAIL_TEMPLATE_CANCEL_ID;
        break;
      case 'completeWorkOrder':
        dynamicTemplateData = {
          author: `${workOrder.getUser().getName()} ${workOrder.getUser().getSurname()}`,
          element: workOrder
            .getAsset()
            .getElement()
            .getName(),
          sector: workOrder
            .getAsset()
            .getSector()
            .getName(),
          area: workOrder
            .getAsset()
            .getArea()
            .getName(),
          comment: workOrder.getComment(),
          asset: workOrder.getAsset().getCode(),
          priority: workOrder.getPriority(),
          workers: workOrder.getWorkersNameByUserWorkOrders().join(', '),
          orderDate: workOrder.getOrderDate(),
          startDate: workOrder.getStartDate(),
          realizationDate: workOrder.getRealizationDate(),
          taskDescription: workOrder.getTaskDescription(),
        };
        templateId = process.env.MAIL_TEMPLATE_COMPLETE_ID;
        break;
      default:
        break;
    }
    return { dynamicTemplateData, templateId };
  }
}
