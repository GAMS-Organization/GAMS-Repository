import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyEducationalElementCommand from '../../../../Application/Commands/EducationalElement/DestroyEducationalElementCommand';

@injectable()
export default class DestroyEducationalElementAdapter {
  public from(request: Request): DestroyEducationalElementCommand {
    const educationalElementId = parseInt(request.params.id);

    if (!educationalElementId) {
      throw new ValidationException('El id del artículo es requerido');
    }

    if (educationalElementId < 1) {
      throw new ValidationException('El id del artículo no es válido');
    }

    return new DestroyEducationalElementCommand(educationalElementId);
  }
}
