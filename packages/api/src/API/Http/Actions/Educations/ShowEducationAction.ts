import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import StoreEducationsPresenter from '../../Presenters/Educations/StoreEducationsPresenter';
import ShowEducationHandler from '../../../../Application/Handlers/Educations/ShowEducationHandler';
import ShowEducationAdapter from '../../Adapters/Educations/showEducationAdapter';

@injectable()
export default class ShowEducationAction {
  private adapter: ShowEducationAdapter;
  private handler: ShowEducationHandler;

  public constructor(adapter: ShowEducationAdapter, handler: ShowEducationHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = await this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreEducationsPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowEducationAction: Education has been retrieved'));
  }
}
