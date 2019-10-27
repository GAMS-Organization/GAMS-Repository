import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowEducationCommand from '../../../../Application/Commands/Educations/showEducationCommand';

@injectable()
export default class ShowEducationAdapter {
  public from(request: Request): ShowEducationCommand {
    const id = request.params.id;

    if (!id) {
      throw new ValidationException('Education id is required');
    }

    if (id < 1) {
      throw new ValidationException('Education id is not valid');
    }

    return new ShowEducationCommand(id);
  }
}
