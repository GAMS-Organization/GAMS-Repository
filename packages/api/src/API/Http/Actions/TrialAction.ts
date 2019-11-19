import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../Enums/HttpStatuses';
import { success } from '../../../utils/customResponse';
import joiToSwagger from 'joi-to-swagger';
import { storeRooftopperSchema } from '../Validations/Schemas/RooftopperSchema';

@injectable()
export default class TrialAction {
  public async execute(_request: Request, response: Response): Promise<Response> {
    // @ts-ignore
    const { swagger, components } = joiToSwagger(storeRooftopperSchema);
    console.log(JSON.stringify(swagger));
    console.log(components);
    return response.status(HTTP_CODES.CREATED).json(success(JSON.stringify(swagger), 'Prueba de UserRoleRepository'));
  }
}
