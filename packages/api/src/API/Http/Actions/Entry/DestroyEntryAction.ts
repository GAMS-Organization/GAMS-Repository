import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyEntryAdapter from '../../Adapters/Entry/DestroyEntryAdapter';
import DestroyEntryHandler from '../../../../Application/Handlers/Entry/DestroyEntryHandler';

@injectable()
export default class DestroyEntryAction {
  private adapter: DestroyEntryAdapter;
  private handler: DestroyEntryHandler;

  public constructor(adapter: DestroyEntryAdapter, handler: DestroyEntryHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
