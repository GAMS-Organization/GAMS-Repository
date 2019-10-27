import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import StoreEducationAdapter from '../../Adapters/Educations/StoreEducationAdapter';
import StoreEducationHandler from '../../../../Application/Handlers/Educations/StoreEducationHandler';
import StoreEducationsPresenter from '../../Presenters/Educations/StoreEducationsPresenter';

@injectable()
export default class StoreEducationAction {
  private adapter: StoreEducationAdapter;
  private handler: StoreEducationHandler;

  public constructor(adapter: StoreEducationAdapter, handler: StoreEducationHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = await this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreEducationsPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreEducationAction: Education has been created'));
  }
}
