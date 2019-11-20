import { Request, Response } from 'express';
import { paginatedSuccess } from '../../../../utils/customResponse';
import { inject, injectable } from 'inversify';
import GetAllUsersPresenter from '../../Presenters/Users/GetAllUsersPresenter';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import UserService from '../../../../Domain/Services/UserService';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class IndexUsersAction {
  private userService: UserService;

  public constructor(@inject(UserService) userService: UserService) {
    this.userService = userService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const usersData = await this.userService.returnAllPaginated(request.query.page, request.query.items_per_page);

    const getAllPresenter = new GetAllUsersPresenter(usersData.data);

    return response
      .status(HTTP_CODES.OK)
      .json(
        paginatedSuccess(
          getAllPresenter.getData(),
          usersData.dataLength,
          usersData.totalDataQuantity,
          usersData.totalPages,
        ),
      );
  }
}
