import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllSectorsPresenter from '../../Presenters/Sector/GetAllSectorsPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import SectorService from '../../../../Domain/Services/SectorService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexSectorsAction {
  private sectorService: SectorService;

  public constructor(@inject(SectorService) sectorService: SectorService) {
    this.sectorService = sectorService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const sectorsData = await this.sectorService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllSectorsPresenter(sectorsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          sectorsData.dataLength,
          sectorsData.totalDataQuantity,
          sectorsData.totalPages,
        ),
      );
  }
}
