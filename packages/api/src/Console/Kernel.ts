import * as schedule from 'node-schedule';
import DIContainer from '../Infrastructure/DI/di.config';
import StockService from '../Domain/Services/StockService';

class ConsoleKernel {
  public handle() {
    this.initCron();
  }

  private initCron() {
    schedule.scheduleJob('45 * * * * *', async () => {
      const stockService = DIContainer.get<StockService>(StockService);

      const criticalAndInsufficientStock = await stockService.getCriticalAndInsufficientStock();
      const message = criticalAndInsufficientStock.reduce((prev, current) => {
        return `${prev}, ${current.getProduct().getName()}`;
      }, 'Los productos con stock insuficiente y critico son: ');
      console.log(message);
    });

    schedule.scheduleJob('0 4 1 * *', async () => {
      //TODO: add service of project
    });
  }
}

export default ConsoleKernel;
