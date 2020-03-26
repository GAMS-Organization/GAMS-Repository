import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyDepartureAdapter from '../../Adapters/Departure/DestroyDepartureAdapter';
import DestroyDepartureHandler from '../../../../Application/Handlers/Departure/DestroyDepartureHandler';

@injectable()
export default class DestroyDepartureAction {
  private adapter: DestroyDepartureAdapter;
  private handler: DestroyDepartureHandler;

  public constructor(adapter: DestroyDepartureAdapter, handler: DestroyDepartureHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
