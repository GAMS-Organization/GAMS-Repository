import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyElementRequestAdapter from '../../Adapters/ElementRequest/DestroyElementRequestAdapter';
import DestroyElementRequestHandler from '../../../../Application/Handlers/ElementRequest/DestroyElementRequestHandler';

@injectable()
export default class DestroyElementRequestAction {
  private adapter: DestroyElementRequestAdapter;
  private handler: DestroyElementRequestHandler;

  public constructor(adapter: DestroyElementRequestAdapter, handler: DestroyElementRequestHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
