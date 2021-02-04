import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyEventAdapter from '../../Adapters/Event/DestroyEventAdapter';
import DestroyEventHandler from '../../../../Application/Handlers/Event/DestroyEventHandler';

@injectable()
export default class DestroyEventAction {
  private adapter: DestroyEventAdapter;
  private handler: DestroyEventHandler;

  public constructor(adapter: DestroyEventAdapter, handler: DestroyEventHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
