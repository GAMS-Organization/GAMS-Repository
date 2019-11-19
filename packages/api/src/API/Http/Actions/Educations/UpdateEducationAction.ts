import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import UpdateEducationHandler from '../../../../Application/Handlers/Educations/updateEducationHandler';
import UpdateEducationAdapter from '../../Adapters/Educations/updateEducationAdapter';
import StoreEducationsPresenter from '../../Presenters/Educations/StoreEducationsPresenter';

@injectable()
export default class UpdateEducationAction {
  private adapter: UpdateEducationAdapter;
  private handler: UpdateEducationHandler;

  public constructor(adapter: UpdateEducationAdapter, handler: UpdateEducationHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = await this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreEducationsPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateEducationAction: Education has been updated'));
  }
}
