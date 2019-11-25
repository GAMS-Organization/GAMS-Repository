import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IProductRepository from '../Interfaces/IProductRepository';

@injectable()
export default class ProductService {
    private productRepository: IProductRepository;

    public constructor(@inject(INTERFACES.IProductRepository) productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    public async returnAllPaginated(
        page: number = 1,
        itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
    ): Promise<PaginatedSuccessData> {
        const productQuantity = await this.productRepository.count();
        const products = await this.productRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
        return {
            data: products,
            dataLength: products.length,
            totalDataQuantity: productQuantity,
            totalPages: Math.ceil(productQuantity / itemsPerPage),
        };
    }
}
