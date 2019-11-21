import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyProductAdapter from '../../Adapters/Product/DestroyProductAdapter';
import DestroyProductHandler from '../../../../Application/Handlers/Product/DestroyProductHandler';

@injectable()
export default class DestroyProductAction {
    private adapter: DestroyProductAdapter;
    private handler: DestroyProductHandler;

    public constructor(adapter: DestroyProductAdapter, handler: DestroyProductHandler) {
        this.adapter = adapter;
        this.handler = handler;
    }

    public async execute(request: Request, response: Response): Promise<void> {
        const command = this.adapter.from(request);

        await this.handler.execute(command);

        return response.status(HTTP_CODES.NO_CONTENT).end();
    }
}
