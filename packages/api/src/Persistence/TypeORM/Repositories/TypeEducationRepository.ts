import IEducationRepository from '../../../Domain/Interfaces/IEducationRepository';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import Education from '../../../Domain/Entities/Education';

@injectable()
export default class TypeEducationRepository extends TypeRepository implements IEducationRepository {
  public async findAll(): Promise<Education[]> {
    return await this.repository(Education).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Education[]> {
    return await this.repository(Education).find({
      relations: ['rooftopperProfile'],
      skip: initialIndex,
      take: limit,
    });
  }

  public async count(): Promise<number> {
    return await this.repository(Education).count();
  }

  public async findOneById(id: number): Promise<Education> {
    return await this.repository(Education).findOne(id, {
      relations: ['rooftopperProfile'],
    });
  }

  public async persist(education: Education): Promise<Education> {
    return await this.repository(Education).save(education);
  }

  public async destroy(education: Education): Promise<boolean> {
    const result = await this.repository(Education).delete(education.getId());

    return result && result.affected === 1;
  }
}
