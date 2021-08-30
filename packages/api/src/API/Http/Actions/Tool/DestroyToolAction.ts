import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyToolAdapter from '../../Adapters/Tool/DestroyToolAdapter';
import DestroyToolHandler from '../../../../Application/Handlers/Tool/DestroyToolHandler';

@injectable()
export default class DestroyToolAction {
  private adapter: DestroyToolAdapter;
  private handler: DestroyToolHandler;

  public constructor(adapter: DestroyToolAdapter, handler: DestroyToolHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
