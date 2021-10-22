import * as schedule from 'node-schedule';
import DIContainer from '../Infrastructure/DI/di.config';
import StockService from '../Domain/Services/StockService';
import WorkOrderService from '../Domain/Services/WorkOrderService';
import { STATE } from '../API/Http/Enums/WorkOrder';
import EventService from '../Domain/Services/EventService';
import MailerService from '../Domain/Services/Mailer/MailerService';
// import { exec } from 'child_process';
class ConsoleKernel {
  public handle() {
    this.initCron();
  }

  private initCron() {
    //Ejecuta la tarea todos los dias de Lunes a Viernes a las 8:00:00 am (8 + 3 por el utc)
    schedule.scheduleJob('00 00 11 ? * 1-5', async () => {
      const stockService = DIContainer.get<StockService>(StockService);
      const workOrderService = DIContainer.get<WorkOrderService>(WorkOrderService);
      const eventService = DIContainer.get<EventService>(EventService);
      const mailService = DIContainer.get<MailerService>(MailerService);

      const criticalAndInsufficientStock = await stockService.getCriticalAndInsufficientStock();

      const stock = {
        alert: criticalAndInsufficientStock.length > 0,
        products: [],
      };

      stock.products = criticalAndInsufficientStock.map(current => {
        return current.getProduct().getName();
      });

      const startDate = new Date();
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + 5);

      const startDateString = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
      const endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

      const weekEvents = await eventService.returnWeekEvents(startDateString, endDateString);

      const preventive = {
        alert: weekEvents.length > 0,
        events: [],
      };

      weekEvents.forEach(event => {
        const title = event.title;
        const workerNames = event.getWorkers().map(worker => {
          return worker.getUser().getName();
        });
        const workers = workerNames.join(', ');
        preventive.events.push({ title, workers });
      });

      const unfinishedWorkOrders = await workOrderService.returnAllUnfinished();
      const freeWorkOrders = {
        alert: false,
        workOrders: [],
      };
      const progressWorkOrders = {
        alert: false,
        workOrders: [],
      };
      unfinishedWorkOrders.forEach(workOrder => {
        if (workOrder.getState() === STATE.FREE) {
          freeWorkOrders.workOrders.push({
            comment: workOrder.getComment(),
            priority: workOrder.getPriority(),
            code: workOrder.getAsset().getCode(),
          });
        } else {
          progressWorkOrders.workOrders.push({
            comment: workOrder.getComment(),
            priority: workOrder.getPriority(),
            code: workOrder.getAsset().getCode(),
            workers: workOrder.getWorkersNameByUserWorkOrders().join(', '),
          });
        }
      });
      freeWorkOrders.alert = freeWorkOrders.workOrders.length > 0;
      progressWorkOrders.alert = progressWorkOrders.workOrders.length > 0;

      const message = {
        stock,
        preventive,
        freeWorkOrders,
        progressWorkOrders,
      };

      await mailService.sendWeekly(message);
      // exec('./life-guard.sh');
    });
  }
}

export default ConsoleKernel;
