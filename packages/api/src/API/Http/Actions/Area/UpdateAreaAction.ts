import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateAreaAdapter from '../../Adapters/Area/UpdateAreaAdapter';
import UpdateAreaHandler from '../../../../Application/Handlers/Area/UpdateAreaHandler';
import UpdateAreaPresenter from '../../Presenters/Area/UpdateAreaPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateAreaAction {
  private adapter: UpdateAreaAdapter;
  private handler: UpdateAreaHandler;

  public constructor(adapter: UpdateAreaAdapter, handler: UpdateAreaHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateAreaPresenter(result);

    return response.status(HTTP_CODES.OK).json(success(presenter.getData(), 'UpdateAreaAction: Area has been updated'));
  }
}
