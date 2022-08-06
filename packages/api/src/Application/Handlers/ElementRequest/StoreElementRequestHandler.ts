import IElementRequestRepository from '../../../Domain/Interfaces/IElementRequestRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreElementRequestCommand from '../../Commands/ElementRequest/StoreElementRequestCommand';
import ElementRequest from '../../../Domain/Entities/ElementRequest';
import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { STATUS } from '../../../API/Http/Enums/EducationalElement';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import EducationalElementService from '../../../Domain/Services/EducationalElementService';

@injectable()
export default class StoreElementRequestHandler {
  private elementRequestRepository: IElementRequestRepository;
  private educationalElementRepository: IEducationalElementRepository;
  private userRepository: IUserRepository;
  private areaRepository: IAreaRepository;
  private educationalElementService: EducationalElementService;
  public constructor(
    @inject(INTERFACES.IElementRequestRepository) elementRequestRepository: IElementRequestRepository,
    @inject(INTERFACES.IEducationalElementRepository) educationalElementRepository: IEducationalElementRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(EducationalElementService) educationalElementService: EducationalElementService,
  ) {
    this.elementRequestRepository = elementRequestRepository;
    this.educationalElementRepository = educationalElementRepository;
    this.userRepository = userRepository;
    this.areaRepository = areaRepository;
    this.educationalElementService = educationalElementService;
  }

  public async execute(command: StoreElementRequestCommand): Promise<ElementRequest> {
    const educationalElement = await this.educationalElementRepository.findOneById(command.getEducationalElementId());

    if (!educationalElement) {
      throw new EntityNotFoundException(`No se encontró el artículo con id: ${command.getEducationalElementId()}`);
    }

    const user = await this.userRepository.findOneById(command.getUserId());

    if (!user) {
      throw new EntityNotFoundException(`No se encontró el usuario con id: ${command.getUserId()}`);
    }

    const area = await this.areaRepository.findOneById(command.getAreaId());

    if (!area) {
      throw new EntityNotFoundException(`No se encontró el área con id: ${command.getAreaId()}`);
    }

    const elementRequest = new ElementRequest(
      await this.educationalElementService.updateQuantity(command.getQuantity(), educationalElement, 'borrow'),
      user,
      STATUS.PENDING,
      //@ts-ignore
      command.getDate(),
      area,
      command.getQuantity(),
    );
    return await this.elementRequestRepository.persist(elementRequest);
  }
}
