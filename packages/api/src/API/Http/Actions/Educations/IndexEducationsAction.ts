import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import EducationService from '../../../../Domain/Services/EducationService';
import GetAllEducationsPresenter from '../../Presenters/Educations/GetAllEducationsPresenter';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexEducationsAction {
  private educationService: EducationService;

  public constructor(@inject(EducationService) educationService: EducationService) {
    this.educationService = educationService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const educationsData = await this.educationService.returnAllPaginated(
      request.query.page,
      request.query.items_per_page,
    );
    const getAllPresenter = new GetAllEducationsPresenter(educationsData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          educationsData.dataLength,
          educationsData.totalDataQuantity,
          educationsData.totalPages,
        ),
      );
  }
}
