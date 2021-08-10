import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreEducationalElementAdapter from '../../Adapters/EducationalElement/StoreEducationalElementAdapter';
import StoreEducationalElementHandler from '../../../../Application/Handlers/EducationalElement/StoreEducationalElementHandler';
import StoreEducationalElementPresenter from '../../Presenters/EducationalElement/StoreEducationalElementPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreEducationalElementAction {
  private adapter: StoreEducationalElementAdapter;
  private handler: StoreEducationalElementHandler;

  public constructor(adapter: StoreEducationalElementAdapter, handler: StoreEducationalElementHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreEducationalElementPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreEducationalElementAction: EducationalElement has been created'));
  }
}
