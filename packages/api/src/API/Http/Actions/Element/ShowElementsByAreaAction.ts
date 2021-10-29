import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowElementsByAreaAdapter from '../../Adapters/Element/ShowElementsByAreaAdapter';
import ShowElementsByAreaHandler from '../../../../Application/Handlers/Element/ShowElementsByAreaHandler';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import GetAllElementsPresenter from '../../Presenters/Element/GetAllElementsPresenter';

@injectable()
export default class ShowElementsByAreaAction {
  private adapter: ShowElementsByAreaAdapter;
  private handler: ShowElementsByAreaHandler;

  public constructor(adapter: ShowElementsByAreaAdapter, handler: ShowElementsByAreaHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetAllElementsPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowElementsByAreaAction: Element has been retrieved'));
  }
}
