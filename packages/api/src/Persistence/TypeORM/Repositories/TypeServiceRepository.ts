import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IServiceRepository from '../../../Domain/Interfaces/IServiceRepository';
import Service from '../../../Domain/Entities/Service';

@injectable()
export default class TypeServiceRepository extends TypeRepository implements IServiceRepository {
  public async findAll(): Promise<Service[]> {
    return await this.repository(Service).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Service[]> {
    return await this.repository(Service).find({ skip: initialIndex, take: limit });
  }

  public async count(): Promise<number> {
    return await this.repository(Service).count();
  }

  public async findOneById(id: number): Promise<Service> {
    return await this.repository(Service).findOne(id);
  }

  public async findByAssetId(id: number): Promise<Service[]> {
    return await this.repository(Service).findOne({ where: { asset: id }, relations: ['asset'] });
  }

  public async findOneByServiceName(name: string): Promise<Service> {
    return await this.repository(Service).findOne({ where: { name: name } });
  }

  public async persist(service: Service): Promise<Service> {
    return await this.repository(Service).save(service);
  }

  public async destroy(service: Service): Promise<boolean> {
    const result = await this.repository(Service).delete(service.getId());

    return result && result.affected === 1;
  }
}
