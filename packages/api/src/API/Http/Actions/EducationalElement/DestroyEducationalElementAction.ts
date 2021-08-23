import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyEducationalElementAdapter from '../../Adapters/EducationalElement/DestroyEducationalElementAdapter';
import DestroyEducationalElementHandler from '../../../../Application/Handlers/EducationalElement/DestroyEducationalElementHandler';

@injectable()
export default class DestroyEducationalElementAction {
  private adapter: DestroyEducationalElementAdapter;
  private handler: DestroyEducationalElementHandler;

  public constructor(adapter: DestroyEducationalElementAdapter, handler: DestroyEducationalElementHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
