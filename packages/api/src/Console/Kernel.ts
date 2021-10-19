import * as schedule from 'node-schedule';
import DIContainer from '../Infrastructure/DI/di.config';
import StockService from '../Domain/Services/StockService';
import WorkOrderService from '../Domain/Services/WorkOrderService';
import { STATE } from '../API/Http/Enums/WorkOrder';
import EventService from '../Domain/Services/EventService';
// import { exec } from 'child_process';
class ConsoleKernel {
  public handle() {
    this.initCron();
  }

  private initCron() {
    schedule.scheduleJob('45 * * * * *', async () => {
      const stockService = DIContainer.get<StockService>(StockService);
      const workOrderService = DIContainer.get<WorkOrderService>(WorkOrderService);
      const eventService = DIContainer.get<EventService>(EventService);

      const criticalAndInsufficientStock = await stockService.getCriticalAndInsufficientStock();
      const productNames = criticalAndInsufficientStock.map(current => {
        return current.getProduct().getName();
      });
      const message = 'Los productos con stock insuficiente y critico son: ' + productNames.join(', ');
      console.log(message);

      const unfinishedWorkOrders = await workOrderService.returnAllUnfinished();
      const freeWorkOrders = [];
      const inProgressWorkOrders = [];
      unfinishedWorkOrders.forEach(workOrder => {
        if (workOrder.getState() === STATE.FREE) {
          freeWorkOrders.push(workOrder.getComment());
        } else {
          inProgressWorkOrders.push(workOrder.getComment());
        }
      });
      const freeWorkOrdersMessage = 'Las órdenes de trabajo libres son: \n - ' + freeWorkOrders.join('\n - ');
      const inProgressWorkOrdersMessage =
        'Las órdenes de trabajo en progreso son: \n - ' + inProgressWorkOrders.join('\n - ');
      console.log(freeWorkOrdersMessage);
      console.log(inProgressWorkOrdersMessage);
      // exec('./life-guard.sh');

      const startDate = new Date();
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + 5);

      const startDateString = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
      const endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

      const weekEvents = await eventService.returnWeekEvents(startDateString, endDateString);
      console.log('Los mantenimientos preventivos para esta semana son: ');
      weekEvents.forEach(event => {
        console.log(event.getTitle());
      });
    });
  }
}

export default ConsoleKernel;
