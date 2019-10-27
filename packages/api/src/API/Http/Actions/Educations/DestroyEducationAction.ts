import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyEducationAdapter from '../../Adapters/Educations/DestroyEducationAdapter';
import DestroyEducationHandler from '../../../../Application/Handlers/Educations/DestroyEducationHandler';

@injectable()
export default class DestroyEducationAction {
  private adapter: DestroyEducationAdapter;
  private handler: DestroyEducationHandler;

  public constructor(adapter: DestroyEducationAdapter, handler: DestroyEducationHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
