import IDepartureRepository from '../../../Domain/Interfaces/IDepartureRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowDepartureCommand from '../../Commands/Departure/ShowDepartureCommand';
import Departure from '../../../Domain/Entities/Departure';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class ShowDepartureHandler {
  private departureRepository: IDepartureRepository;

  public constructor(@inject(INTERFACES.IDepartureRepository) departureRepository: IDepartureRepository) {
    this.departureRepository = departureRepository;
  }

  public async execute(command: ShowDepartureCommand): Promise<Departure> {
    const departure = await this.departureRepository.findOneById(command.getId());
    if (!departure) {
      throw new EntityNotFoundException(`Departure with id: ${command.getId()} not found`);
    }
    return departure;
  }
}
