import IEntryRepository from '../../../Domain/Interfaces/IEntryRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreEntryCommand from '../../Commands/Entry/StoreEntryCommand';
import Entry from '../../../Domain/Entities/Entry';
import PurchaseService from '../../../Domain/Services/PurchaseService';

@injectable()
export default class StoreEntryHandler {
  private entryRepository: IEntryRepository;
  private purchaseService: PurchaseService;
  public constructor(
    @inject(INTERFACES.IEntryRepository) entryRepository: IEntryRepository,
    @inject(PurchaseService) purchaseService: PurchaseService,
  ) {
    this.entryRepository = entryRepository;
    this.purchaseService = purchaseService;
  }

  public async execute(command: StoreEntryCommand): Promise<Entry> {
    const entry = new Entry(command.getDate(), command.getObservations());
    return this.purchaseService.setPurchaseToEntry(
      await this.entryRepository.persist(entry),
      command.getProducts(),
      command.getQuantities(),
      command.getProviders(),
    );
  }
}
