import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateEducationalElementAdapter from '../../Adapters/EducationalElement/UpdateEducationalElementAdapter';
import UpdateEducationalElementHandler from '../../../../Application/Handlers/EducationalElement/UpdateEducationalElementHandler';
import UpdateEducationalElementPresenter from '../../Presenters/EducationalElement/UpdateEducationalElementPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateEducationalElementAction {
  private adapter: UpdateEducationalElementAdapter;
  private handler: UpdateEducationalElementHandler;

  public constructor(adapter: UpdateEducationalElementAdapter, handler: UpdateEducationalElementHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateEducationalElementPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateEducationalElementAction: EducationalElement has been updated'));
  }
}
