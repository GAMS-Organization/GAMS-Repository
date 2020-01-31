import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IEntryRepository from '../../../Domain/Interfaces/IEntryRepository';
import DestroyEntryCommand from '../../Commands/Entry/DestroyEntryCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import PurchaseService from '../../../Domain/Services/PurchaseService';
import StockEntryService from '../../../Domain/Services/StockEntryService';

@injectable()
export default class DestroyEntryHandler {
  private entryRepository: IEntryRepository;
  private purchaseService: PurchaseService;
  private stockEntryService: StockEntryService;

  public constructor(
    @inject(INTERFACES.IEntryRepository) entryRepository: IEntryRepository,
    @inject(PurchaseService) purchaseService: PurchaseService,
    @inject(StockEntryService) stockEntryService: StockEntryService,
  ) {
    this.entryRepository = entryRepository;
    this.purchaseService = purchaseService;
    this.stockEntryService = stockEntryService;
  }

  public async execute(command: DestroyEntryCommand): Promise<boolean> {
    const entry = await this.entryRepository.findOneById(command.getId());

    if (!entry) {
      throw new EntityNotFoundException(`Entry with id: ${command.getId()} not found`);
    }
    await this.purchaseService.destroyPurchasesFromEntry(entry.id);
    await this.stockEntryService.destroyStockEntriesFromEntry(entry.id);
    const entryWasDestroyed = await this.entryRepository.destroy(entry);

    if (!entryWasDestroyed) {
      throw new CannotDeleteEntity(`Entry with id: ${command.getId()} could not be deleted`);
    }

    return entryWasDestroyed;
  }
}
