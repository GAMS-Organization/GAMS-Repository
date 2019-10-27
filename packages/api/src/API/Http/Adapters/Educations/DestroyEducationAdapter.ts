import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyEducationCommand from '../../../../Application/Commands/Educations/DestroyEducationCommand';

@injectable()
export default class DestroyEducationAdapter {
  public from(request: Request): DestroyEducationCommand {
    const id = request.params.id;

    if (!id) {
      throw new ValidationException('Education id is required');
    }

    if (id < 1) {
      throw new ValidationException('Education id is not valid');
    }

    return new DestroyEducationCommand(id);
  }
}
