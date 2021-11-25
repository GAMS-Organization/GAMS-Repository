import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllStockPresenter from '../../Presenters/Stock/GetAllStockPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import StockService from '../../../../Domain/Services/StockService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexStockAction {
  private stockService: StockService;

  public constructor(@inject(StockService) stockService: StockService) {
    this.stockService = stockService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    //@ts-ignore
    const stocksData = await this.stockService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllStockPresenter(stocksData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          stocksData.dataLength,
          stocksData.totalDataQuantity,
          stocksData.totalPages,
        ),
      );
  }
}
