import { Request, Response } from 'express';
import { injectable } from 'inversify';
import DisableUserAdapter from '../../Adapters/Users/DisableUserAdapter';
import DisableUserHandler from '../../../../Application/Handlers/Users/DisableUserHandler';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import UpdateUserPresenter from '../../Presenters/Users/UpdateUserPresenter';
import { success } from '../../../../utils/customResponse';

@injectable()
export default class DisableUsersAction {
  private adapter: DisableUserAdapter;
  private handler: DisableUserHandler;

  public constructor(adapter: DisableUserAdapter, handler: DisableUserHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateUserPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'DisableUsersAction: User has been disabled'));
  }
}
