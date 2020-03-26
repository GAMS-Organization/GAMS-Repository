import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllDeparturePresenter from '../../Presenters/Departure/GetAllDeparturePresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DepartureService from '../../../../Domain/Services/DepartureService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexDepartureAction {
  private DepartureService: DepartureService;

  public constructor(@inject(DepartureService) DepartureService: DepartureService) {
    this.DepartureService = DepartureService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const usersData = await this.DepartureService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllDeparturePresenter(usersData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          usersData.dataLength,
          usersData.totalDataQuantity,
          usersData.totalPages,
        ),
      );
  }
}
