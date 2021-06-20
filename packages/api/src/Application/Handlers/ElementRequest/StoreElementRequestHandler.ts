import IElementRequestRepository from '../../../Domain/Interfaces/IElementRequestRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreElementRequestCommand from '../../Commands/ElementRequest/StoreElementRequestCommand';
import ElementRequest from '../../../Domain/Entities/ElementRequest';
import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { STATUS } from '../../../API/Http/Enums/EducationalElement';

@injectable()
export default class StoreElementRequestHandler {
  private elementRequestRepository: IElementRequestRepository;
  private educationalElementRepository: IEducationalElementRepository;
  private userRepository: IUserRepository;
  public constructor(
    @inject(INTERFACES.IElementRequestRepository) elementRequestRepository: IElementRequestRepository,
    @inject(INTERFACES.IElementRequestRepository) educationalElementRepository: IEducationalElementRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
  ) {
    this.elementRequestRepository = elementRequestRepository;
    this.educationalElementRepository = educationalElementRepository;
    this.userRepository = userRepository;
  }

  public async execute(command: StoreElementRequestCommand): Promise<ElementRequest> {
    const educationalElement = await this.educationalElementRepository.findOneById(command.getEducationalElementId());

    console.log(educationalElement);

    if (!educationalElement) {
      throw new EntityNotFoundException(`EducationalElement with id: ${command.getEducationalElementId()} not found`);
    }

    const user = await this.userRepository.findOneById(command.getUserId());

    if (!educationalElement) {
      throw new EntityNotFoundException(`User with id: ${command.getUserId()} not found`);
    }

    const elementRequest = new ElementRequest(educationalElement, user, STATUS.PENDING, command.getDate());
    return await this.elementRequestRepository.persist(elementRequest);
  }
}
