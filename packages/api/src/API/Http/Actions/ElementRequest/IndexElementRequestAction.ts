import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllElementRequestPresenter from '../../Presenters/ElementRequest/GetAllElementRequestPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import ElementRequestService from '../../../../Domain/Services/ElementRequestService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexElementRequestAction {
  private elementRequestService: ElementRequestService;

  public constructor(@inject(ElementRequestService) elementRequestService: ElementRequestService) {
    this.elementRequestService = elementRequestService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const elementRequestsData = await this.elementRequestService.returnAllPaginated(
      request.query.page,
      request.query.items_per_page,
    );

    const getAllPresenter = new GetAllElementRequestPresenter(elementRequestsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          elementRequestsData.dataLength,
          elementRequestsData.totalDataQuantity,
          elementRequestsData.totalPages,
        ),
      );
  }
}
