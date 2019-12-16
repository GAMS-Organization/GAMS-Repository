import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllEntriesPresenter from '../../Presenters/Entry/GetAllEntriesPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import EntryService from '../../../../Domain/Services/EntryService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexEntryAction {
  private entryService: EntryService;

  public constructor(@inject(EntryService) entryService: EntryService) {
    this.entryService = entryService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const usersData = await this.entryService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllEntriesPresenter(usersData.data);

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
