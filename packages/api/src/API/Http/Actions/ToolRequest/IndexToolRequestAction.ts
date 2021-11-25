import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllToolRequestPresenter from '../../Presenters/ToolRequest/GetAllToolRequestPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import ToolRequestService from '../../../../Domain/Services/ToolRequestService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexToolRequestAction {
  private toolRequestService: ToolRequestService;

  public constructor(@inject(ToolRequestService) toolRequestService: ToolRequestService) {
    this.toolRequestService = toolRequestService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const toolRequestsData = await this.toolRequestService.returnAllPaginated(
      //@ts-ignore
      request.query.page,
      request.query.items_per_page,
    );

    const getAllPresenter = new GetAllToolRequestPresenter(toolRequestsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          toolRequestsData.dataLength,
          toolRequestsData.totalDataQuantity,
          toolRequestsData.totalPages,
        ),
      );
  }
}
