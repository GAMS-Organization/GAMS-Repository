import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import ServerError from '../../../../Application/Exceptions/ServerError';
import { IStorageService } from '../../../../Domain/Services/Storage/IStorageService';
import { INTERFACES } from '../../../../Infrastructure/DI/interfaces.types';

@injectable()
class UploadImageAction {
  private storageService: IStorageService;
  constructor(@inject(INTERFACES.IStorageService) storageService: IStorageService) {
    this.storageService = storageService;
  }
  public async execute(request: Request, response: Response) {
    const uploadFile = this.storageService.getConfig('area/');
    await uploadFile(request, response, error => {
      if (error) {
        throw new ServerError(error.message);
      }
      // @ts-ignore
      response.status(200).send(request.file);
    });
  }
}

export default UploadImageAction;
