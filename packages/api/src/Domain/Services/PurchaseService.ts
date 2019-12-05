import IPurchaseRepository from '../Interfaces/IPurchaseRepository';
import { inject, injectable } from 'inversify';
import IProductRepository from '../Interfaces/IProductRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import Purchase from '../Entities/Purchase';
import Entry from '../Entities/Entry';

// import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';

@injectable()
export default class PurchaseService {
  private purchaseRepository: IPurchaseRepository;
  private productRepository: IProductRepository;

  public constructor(
    @inject(INTERFACES.IProductRepository) productRepository: IProductRepository,
    @inject(INTERFACES.IPurchaseRepository) purchaseRepository: IPurchaseRepository,
  ) {
    this.productRepository = productRepository;
    this.purchaseRepository = purchaseRepository;
  }

  public async setPurchaseToEntry(
    entry: Entry,
    commandProducts: string[],
    commandQuantities: number[],
    commandProviders: string[],
  ): Promise<Entry> {
    const products = await this.productRepository.findAll();
    const purchases: Purchase[] = [];
    products.map(async product => {
      const productName = product.getName();
      if (commandProducts.includes(productName)) {
        let index = commandProducts.indexOf(productName);
        let quantity = commandQuantities[index];
        let provider = commandProviders[index];
        await this.purchaseRepository.persist(new Purchase(quantity, provider, product, entry));
        purchases.push(new Purchase(quantity, provider, product, entry));
      }
    });
    //no devuelve los purchases que deberia tener
    entry.setPurchases(purchases);
    return entry;
  }
  /*
    public async destroyUserRolesFromUser(userId: number): Promise<void> {
      const userRoles = await this.userRoleRepository.findByUserId(userId);
      for (const userRole of userRoles) {
        try {
          await this.userRoleRepository.destroy(userRole);
        } catch (e) {
          throw new CannotDeleteEntity(`UserRole with id: ${userRole.getId()} could not be deleted`);
        }
      }
    }*/
}