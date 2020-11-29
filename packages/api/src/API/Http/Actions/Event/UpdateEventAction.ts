import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateEventAdapter from '../../Adapters/Event/UpdateEventAdapter';
import UpdateEventHandler from '../../../../Application/Handlers/Event/UpdateEventHandler';
import UpdateEventPresenter from '../../Presenters/Event/UpdateEventPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateEventAction {
  private adapter: UpdateEventAdapter;
  private handler: UpdateEventHandler;

  public constructor(adapter: UpdateEventAdapter, handler: UpdateEventHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateEventPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateEventAction: Event has been updated'));
  }
}
