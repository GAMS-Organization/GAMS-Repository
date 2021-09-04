import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyToolRequestAdapter from '../../Adapters/ToolRequest/DestroyToolRequestAdapter';
import DestroyToolRequestHandler from '../../../../Application/Handlers/ToolRequest/DestroyToolRequestHandler';

@injectable()
export default class DestroyToolRequestAction {
  private adapter: DestroyToolRequestAdapter;
  private handler: DestroyToolRequestHandler;

  public constructor(adapter: DestroyToolRequestAdapter, handler: DestroyToolRequestHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
