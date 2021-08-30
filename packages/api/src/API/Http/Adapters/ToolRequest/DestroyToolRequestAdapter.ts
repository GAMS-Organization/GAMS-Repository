import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyToolRequestCommand from '../../../../Application/Commands/ToolRequest/DestroyToolRequestCommand';

@injectable()
export default class DestroyToolRequestAdapter {
  public from(request: Request): DestroyToolRequestCommand {
    const toolRequestId = parseInt(request.params.id);

    if (!toolRequestId) {
      throw new ValidationException('ToolRequest id are required');
    }

    if (toolRequestId < 1) {
      throw new ValidationException('ToolRequest id is not valid');
    }

    return new DestroyToolRequestCommand(toolRequestId);
  }
}
