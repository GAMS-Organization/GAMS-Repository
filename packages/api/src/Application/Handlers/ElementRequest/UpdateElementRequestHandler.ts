import IElementRequestRepository from '../../../Domain/Interfaces/IElementRequestRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateElementRequestCommand from '../../Commands/ElementRequest/UpdateElementRequestCommand';
import ElementRequest from '../../../Domain/Entities/ElementRequest';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';

@injectable()
export default class UpdateElementRequestHandler {
  private elementRequestRepository: IElementRequestRepository;
  private educationalElementRepository: IEducationalElementRepository;
  private areaRepository: IAreaRepository;

  public constructor(
    @inject(INTERFACES.IElementRequestRepository) elementRequestRepository: IElementRequestRepository,
    @inject(INTERFACES.IEducationalElementRepository) educationalElementRepository: IEducationalElementRepository,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
  ) {
    this.elementRequestRepository = elementRequestRepository;
    this.educationalElementRepository = educationalElementRepository;
    this.areaRepository = areaRepository;
  }

  public async execute(command: UpdateElementRequestCommand): Promise<ElementRequest> {
    const elementRequest = await this.elementRequestRepository.findOneById(command.getId());
    if (!elementRequest) {
      throw new EntityNotFoundException(`ElementRequest with id: ${command.getId()} not found`);
    }

    const educationalElement = await this.educationalElementRepository.findOneById(command.getEducationalElementId());

    if (!educationalElement) {
      throw new EntityNotFoundException(`EducationalElement with id: ${command.getEducationalElementId()} not found`);
    }

    const area = await this.areaRepository.findOneById(command.getAreaId());

    if (!area) {
      throw new EntityNotFoundException(`Area with id: ${command.getAreaId()} not found`);
    }

    elementRequest.setStatus(command.getStatus());
    elementRequest.getArea().getId() !== command.getAreaId() ? elementRequest.setArea(area) : null;
    elementRequest.getElement().getId() !== command.getEducationalElementId()
      ? elementRequest.setElement(educationalElement)
      : null;

    return await this.elementRequestRepository.persist(elementRequest);
  }
}
