import UserService from '../UserService';
import { inject, injectable } from 'inversify';
import User from '../../Entities/User';
import WorkOrder from '../../Entities/WorkOrder';
import ToolRequest from '../../Entities/ToolRequest';
import ElementRequest from '../../Entities/ElementRequest';

@injectable()
export default class MailerService {
  private userService: UserService;
  private sgMail = require('@sendgrid/mail');

  public constructor(@inject(UserService) userService: UserService) {
    this.userService = userService;
    this.sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public async sendEmail(subject: string, workOrder: WorkOrder, type: string, userId?: number[]) {
    const { dynamicTemplateData, templateId } = MailerService.getCustomMessage(type, workOrder);
    const recipients = [];
    if (process.env.APP_ENVIRONMENT === 'development') {
      const to = {
        email: process.env.RECIPIENT_EMAIL_TEST,
      };
      recipients.push(to);
    } else {
      const emails = await this.getRecipientMail(userId);
      emails.forEach(email => {
        const to = {
          email: email,
        };
        recipients.push(to);
      });
    }
    const msg = {
      from: process.env.EMAIL_SENDER, // Change to your verified sender
      subject: subject,
      templateId: templateId,
      personalizations: [
        {
          to: recipients,
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

  public async sendWeekly(message: object) {
    const recipients = [];
    if (process.env.APP_ENVIRONMENT === 'development') {
      const to = {
        email: process.env.RECIPIENT_EMAIL_TEST,
      };
      recipients.push(to);
    } else {
      const emails = await this.getRecipientMail(null);
      emails.forEach(email => {
        const to = {
          email: email,
        };
        recipients.push(to);
      });
    }
    const templateId = process.env.MAIL_TEMPLATE_WEEKLY_ID;
    const msg = {
      from: process.env.EMAIL_SENDER, // Change to your verified sender
      subject: 'Reporte semanal',
      templateId,
      personalizations: [
        {
          to: recipients,
          dynamicTemplateData: message,
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

  public async sendToolAndElementRequestEmail(subject: string, toolOrElementRequest: ToolRequest | ElementRequest) {
    const recipients = [];
    if (process.env.APP_ENVIRONMENT === 'development') {
      const to = {
        email: process.env.RECIPIENT_EMAIL_TEST,
      };
      recipients.push(to);
    } else {
      const emails = await this.getRecipientMail(null);
      emails.forEach(email => {
        const to = {
          email: email,
        };
        recipients.push(to);
      });
    }
    const templateId = process.env.MAIL_TEMPLATE_TOOL_AND_ELEMENT_ID;
    const msg = {
      from: process.env.EMAIL_SENDER, // Change to your verified sender
      subject: subject,
      templateId,
      personalizations: [
        {
          to: recipients,
          dynamicTemplateData: {
            subject: subject,
            author: `${toolOrElementRequest.getUser().getName()} ${toolOrElementRequest.getUser().getSurname()}`,
            item: toolOrElementRequest.getItemName(),
            quantity: toolOrElementRequest.getQuantity(),
            area: toolOrElementRequest.getArea().getName(),
            sector: toolOrElementRequest
              .getArea()
              .getSector()
              .getName(),
          },
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
      const users: User[] = await this.userService.findByRole('boss');
      users.forEach(user => {
        recipient.push(user.getEmail());
      });
    }
    return recipient;
  }

  private static getCustomMessage(
    type: string,
    workOrder: WorkOrder,
  ): { dynamicTemplateData: object; templateId: string } {
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
