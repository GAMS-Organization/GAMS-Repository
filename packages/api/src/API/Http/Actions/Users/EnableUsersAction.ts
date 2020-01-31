import { Request, Response } from 'express';
import { injectable } from 'inversify';
import EnableUserAdapter from '../../Adapters/Users/EnableUserAdapter';
import EnableUserHandler from '../../../../Application/Handlers/Users/EnableUserHandler';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import UpdateUserPresenter from '../../Presenters/Users/UpdateUserPresenter';
import { success } from '../../../../utils/customResponse';

@injectable()
export default class DisableUsersAction {
  private adapter: EnableUserAdapter;
  private handler: EnableUserHandler;

  public constructor(adapter: EnableUserAdapter, handler: EnableUserHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateUserPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'EnableUsersAction: User has been enabled'));
  }
}
