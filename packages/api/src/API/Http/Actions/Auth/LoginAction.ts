import { Request, Response } from 'express';
import { injectable } from 'inversify';
import LoginAdapter from '../../Adapters/Auth/LoginAdapter';
import LoginHandler from '../../../../Application/Handlers/Auth/LoginHandler';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import { success } from '../../../../utils/customResponse';
import LoginPresenter from '../../Presenters/Auth/LoginPresenter';

@injectable()
export default class LoginAction {
  private adapter: LoginAdapter;
  private handler: LoginHandler;

  public constructor(adapter: LoginAdapter, handler: LoginHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const { user, token } = await this.handler.execute(command);

    const presenter = new LoginPresenter(user, token);

    return response.status(HTTP_CODES.CREATED).json(success(presenter.getData(), 'LoginAction: User has logged in'));
  }
}
