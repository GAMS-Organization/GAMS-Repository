import { Request } from 'express';
import { inject, injectable } from 'inversify';
import Validator from '../../Validations/Utils/Validator';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import { storeRooftopperSchema } from '../../Validations/Schemas/RooftopperSchema';
import UpdateRooftopperCommand from '../../../../Application/Commands/Rooftoppers/UpdateRooftopperCommand';
import RooftopperProfileService from '../../../../Domain/Services/RooftopperProfileService';

@injectable()
export default class UpdateRooftopperAdapter {
  private validator: Validator;
  private rooftopperProfileService: RooftopperProfileService;

  public constructor(@inject(RooftopperProfileService) rooftopperProfileService: RooftopperProfileService) {
    this.validator = new Validator();
    this.rooftopperProfileService = rooftopperProfileService;
  }

  public async from(request: Request): Promise<UpdateRooftopperCommand> {
    const error = this.validator.validate(request.body, storeRooftopperSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }
    const slugError = await this.rooftopperProfileService.validateUniqueSlug(request.body.slug);
    if (slugError) {
      throw new ValidationException(JSON.stringify(slugError));
    }

    return new UpdateRooftopperCommand(
        parseInt(request.params.id),
      request.body.name,
      request.body.surname,
      request.body.profileImage,
      new Date(request.body.registrationDate),
      JSON.parse(request.body.isAvailable),
      JSON.parse(request.body.isWorkingOnAnotherProject),
      request.body.workableTime,
      request.body.slug.toLowerCase(),
      request.body.oneLineDescription,
      request.body.summaryDescription,
      request.body.city,
      request.body.state,
      request.body.country,
    );
  }
}
