import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllWorkOrdersPresenter from '../../Presenters/WorkOrder/GetAllWorkOrdersPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import WorkOrderService from '../../../../Domain/Services/WorkOrderService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexWorkOrdersAction {
  private workOrderService: WorkOrderService;

  public constructor(@inject(WorkOrderService) workOrderService: WorkOrderService) {
    this.workOrderService = workOrderService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const workOrdersData = await this.workOrderService.returnAllPaginated(
      request.query.page,
      request.query.items_per_page,
    );

    const getAllPresenter = new GetAllWorkOrdersPresenter(workOrdersData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          workOrdersData.dataLength,
          workOrdersData.totalDataQuantity,
          workOrdersData.totalPages,
        ),
      );
  }
}
