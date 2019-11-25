import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllProductsPresenter from '../../Presenters/Product/GetAllProductsPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import ProductService from '../../../../Domain/Services/ProductService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexProductsAction {
  private productService: ProductService;

  public constructor(@inject(ProductService) productService: ProductService) {
    this.productService = productService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const productsData = await this.productService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllProductsPresenter(productsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          productsData.dataLength,
          productsData.totalDataQuantity,
          productsData.totalPages,
        ),
      );
  }
}
