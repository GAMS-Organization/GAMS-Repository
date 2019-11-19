import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyRooftopperAdapter from '../../Adapters/Rooftoppers/DestroyRooftopperAdapter';
import DestroyRooftopperHandler from '../../../../Application/Handlers/Rooftoppers/DestroyRooftopperHandler';

@injectable()
export default class DestroyRooftopperAction {
  private adapter: DestroyRooftopperAdapter;
  private handler: DestroyRooftopperHandler;

  public constructor(adapter: DestroyRooftopperAdapter, handler: DestroyRooftopperHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
