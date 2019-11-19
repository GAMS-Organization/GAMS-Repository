import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import GetAllRooftoppersPresenter from '../../Presenters/Rooftoppers/GetAllRooftoppersPresenter';
import RooftopperProfileService from '../../../../Domain/Services/RooftopperProfileService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexRooftoppersAction {
  private rooftopperProfilesService: RooftopperProfileService;

  public constructor(@inject(RooftopperProfileService) rooftopperProfilesService: RooftopperProfileService) {
    this.rooftopperProfilesService = rooftopperProfilesService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const rooftopperProfilesData = await this.rooftopperProfilesService.returnAllPaginated(
      request.query.page,
      request.query.items_per_page,
    );
    const getAllPresenter = new GetAllRooftoppersPresenter(rooftopperProfilesData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          rooftopperProfilesData.dataLength,
          rooftopperProfilesData.totalDataQuantity,
          rooftopperProfilesData.totalPages,
        ),
      );
  }
}
