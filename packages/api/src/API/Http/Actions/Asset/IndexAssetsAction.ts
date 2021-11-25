import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllAssetsPresenter from '../../Presenters/Asset/GetAllAssetsPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import AssetService from '../../../../Domain/Services/AssetService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexAssetsAction {
  private assetService: AssetService;

  public constructor(@inject(AssetService) assetService: AssetService) {
    this.assetService = assetService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    //@ts-ignore
    const assetsData = await this.assetService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllAssetsPresenter(assetsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          assetsData.dataLength,
          assetsData.totalDataQuantity,
          assetsData.totalPages,
        ),
      );
  }
}
