import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyElementAdapter from '../../Adapters/Element/DestroyElementAdapter';
import DestroyElementHandler from '../../../../Application/Handlers/Element/DestroyElementHandler';

@injectable()
export default class DestroyElementAction {
  private adapter: DestroyElementAdapter;
  private handler: DestroyElementHandler;

  public constructor(adapter: DestroyElementAdapter, handler: DestroyElementHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
