import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllToolPresenter from '../../Presenters/Tool/GetAllToolPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import ToolService from '../../../../Domain/Services/ToolService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexToolAction {
  private toolService: ToolService;

  public constructor(@inject(ToolService) toolService: ToolService) {
    this.toolService = toolService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    //@ts-ignore
    const toolsData = await this.toolService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllToolPresenter(toolsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          toolsData.dataLength,
          toolsData.totalDataQuantity,
          toolsData.totalPages,
        ),
      );
  }
}
