import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllEducationalElementPresenter from '../../Presenters/EducationalElement/GetAllEducationalElementPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import EducationalElementService from '../../../../Domain/Services/EducationalElementService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexEducationalElementAction {
  private elementRequestService: EducationalElementService;

  public constructor(@inject(EducationalElementService) elementRequestService: EducationalElementService) {
    this.elementRequestService = elementRequestService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const elementRequestsData = await this.elementRequestService.returnAllPaginated(
      request.query.page,
      request.query.items_per_page,
    );

    const getAllPresenter = new GetAllEducationalElementPresenter(elementRequestsData.data);

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
