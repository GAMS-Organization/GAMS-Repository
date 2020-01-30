import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllServicesPresenter from '../../Presenters/Service/GetAllServicesPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import ServiceService from '../../../../Domain/Services/ServiceService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexServicesAction {
  private serviceService: ServiceService;

  public constructor(@inject(ServiceService) serviceService: ServiceService) {
    this.serviceService = serviceService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const servicesData = await this.serviceService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllServicesPresenter(servicesData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          servicesData.dataLength,
          servicesData.totalDataQuantity,
          servicesData.totalPages,
        ),
      );
  }
}
