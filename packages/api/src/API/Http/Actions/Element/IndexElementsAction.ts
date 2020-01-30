import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllElementsPresenter from '../../Presenters/Element/GetAllElementsPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import ElementService from '../../../../Domain/Services/ElementService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexElementsAction {
  private elementService: ElementService;

  public constructor(@inject(ElementService) elementService: ElementService) {
    this.elementService = elementService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const elementsData = await this.elementService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllElementsPresenter(elementsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          elementsData.dataLength,
          elementsData.totalDataQuantity,
          elementsData.totalPages,
        ),
      );
  }
}
