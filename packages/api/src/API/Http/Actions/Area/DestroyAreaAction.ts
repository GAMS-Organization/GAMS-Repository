import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyAreaAdapter from '../../Adapters/Area/DestroyAreaAdapter';
import DestroyAreaHandler from '../../../../Application/Handlers/Area/DestroyAreaHandler';

@injectable()
export default class DestroyAreaAction {
  private adapter: DestroyAreaAdapter;
  private handler: DestroyAreaHandler;

  public constructor(adapter: DestroyAreaAdapter, handler: DestroyAreaHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
