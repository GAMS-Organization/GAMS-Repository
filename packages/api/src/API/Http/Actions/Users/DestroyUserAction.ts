import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyUserAdapter from '../../Adapters/Users/DestroyUserAdapter';
import DestroyUserHandler from '../../../../Application/Handlers/Users/DestroyUserHandler';

@injectable()
export default class DestroyUserAction {
  private adapter: DestroyUserAdapter;
  private handler: DestroyUserHandler;

  public constructor(adapter: DestroyUserAdapter, handler: DestroyUserHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
