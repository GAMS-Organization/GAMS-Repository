import IElementRequestRepository from '../../../Domain/Interfaces/IElementRequestRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateElementRequestCommand from '../../Commands/ElementRequest/UpdateElementRequestCommand';
import ElementRequest from '../../../Domain/Entities/ElementRequest';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';
import { STATUS } from '../../../API/Http/Enums/EducationalElement';
import EducationalElementService from '../../../Domain/Services/EducationalElementService';
import CannotUpdateEntity from '../../Exceptions/CannotUpdateEntity';

@injectable()
export default class UpdateElementRequestHandler {
  private elementRequestRepository: IElementRequestRepository;
  private educationalElementRepository: IEducationalElementRepository;
  private areaRepository: IAreaRepository;
  private educationalElementService: EducationalElementService;

  public constructor(
    @inject(INTERFACES.IElementRequestRepository) elementRequestRepository: IElementRequestRepository,
    @inject(INTERFACES.IEducationalElementRepository) educationalElementRepository: IEducationalElementRepository,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(EducationalElementService) educationalElementService: EducationalElementService,
  ) {
    this.elementRequestRepository = elementRequestRepository;
    this.educationalElementRepository = educationalElementRepository;
    this.areaRepository = areaRepository;
    this.educationalElementService = educationalElementService;
  }

  public async execute(command: UpdateElementRequestCommand): Promise<ElementRequest> {
    const elementRequest = await this.elementRequestRepository.findOneById(command.getId());
    if (!elementRequest) {
      throw new EntityNotFoundException(`No se encontró la solicitud de artículo con id: ${command.getId()}`);
    }

    const educationalElement = await this.educationalElementRepository.findOneById(command.getEducationalElementId());

    if (!educationalElement) {
      throw new EntityNotFoundException(`ENo se encontró el artículo con id: ${command.getEducationalElementId()}`);
    }

    const area = await this.areaRepository.findOneById(command.getAreaId());

    if (!area) {
      throw new EntityNotFoundException(`No se encontró el área con id: ${command.getAreaId()}`);
    }

    if (elementRequest.getStatus() === STATUS.CANCELED) {
      throw new CannotUpdateEntity('La solicitud ha sido cancelada y no puede ser actualizada');
    }

    if (elementRequest.getStatus() === STATUS.RETURNED) {
      throw new CannotUpdateEntity('El elemento ya ha sido devuelto');
    }

    if (command.getStatus() === STATUS.CANCELED && elementRequest.getStatus() !== STATUS.PENDING) {
      throw new CannotUpdateEntity('La solicitud puede ser cancelada solamente si el estado actual es pendiente');
    }

    elementRequest.setStatus(command.getStatus());
    elementRequest.getArea().getId() !== command.getAreaId() ? elementRequest.setArea(area) : null;
    elementRequest.getElement().getId() !== command.getEducationalElementId()
      ? elementRequest.setElement(educationalElement)
      : null;

    if (command.getStatus() === STATUS.RETURNED || command.getStatus() === STATUS.CANCELED) {
      await this.educationalElementService.updateQuantity(elementRequest.getQuantity(), educationalElement, 'return');
    }

    return await this.elementRequestRepository.persist(elementRequest);
  }
}
