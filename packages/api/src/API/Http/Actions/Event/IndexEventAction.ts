import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllEventsPresenter from '../../Presenters/Event/GetAllEventsPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import EventService from '../../../../Domain/Services/EventService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexEventAction {
  private eventService: EventService;

  public constructor(@inject(EventService) eventService: EventService) {
    this.eventService = eventService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const usersData = await this.eventService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllEventsPresenter(usersData.data);

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
