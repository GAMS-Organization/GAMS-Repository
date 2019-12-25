import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowProductByNameAdapter from '../../Adapters/Product/ShowProductByNameAdapter';
import ShowProductByNameHandler from '../../../../Application/Handlers/Product/ShowProductByNameHandler';
import StoreProductPresenter from '../../Presenters/Product/StoreProductPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowProductByNameAction {
    private adapter: ShowProductByNameAdapter;
    private handler: ShowProductByNameHandler;

    public constructor(adapter: ShowProductByNameAdapter, handler: ShowProductByNameHandler) {
        this.adapter = adapter;
        this.handler = handler;
    }

    public async execute(request: Request, response: Response): Promise<Response> {
        const command = this.adapter.from(request);

        const result = await this.handler.execute(command);

        const presenter = new StoreProductPresenter(result);

        return response
            .status(HTTP_CODES.OK)
            .json(success(presenter.getData(), 'ShowProductAction: Product profile has been retrieved'));
    }
}


