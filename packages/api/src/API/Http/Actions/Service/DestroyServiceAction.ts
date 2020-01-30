import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyServiceAdapter from '../../Adapters/Service/DestroyServiceAdapter';
import DestroyServiceHandler from '../../../../Application/Handlers/Service/DestroyServiceHandler';

@injectable()
export default class DestroyServiceAction {
  private adapter: DestroyServiceAdapter;
  private handler: DestroyServiceHandler;

  public constructor(adapter: DestroyServiceAdapter, handler: DestroyServiceHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
