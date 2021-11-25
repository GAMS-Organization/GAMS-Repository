import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllAreasPresenter from '../../Presenters/Area/GetAllAreasPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import AreaService from '../../../../Domain/Services/AreaService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexAreasAction {
  private areaService: AreaService;

  public constructor(@inject(AreaService) areaService: AreaService) {
    this.areaService = areaService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    //@ts-ignore
    const areasData = await this.areaService.returnAllPaginated(request.query.page, request.query.items_per_page);
    const getAllPresenter = new GetAllAreasPresenter(areasData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          areasData.dataLength,
          areasData.totalDataQuantity,
          areasData.totalPages,
        ),
      );
  }
}
