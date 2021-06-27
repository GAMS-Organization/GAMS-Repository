import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';
import EducationalElement from '../../../Domain/Entities/EducationalElement';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeEducationalElementRepository extends TypeRepository implements IEducationalElementRepository {
  public async findAll(): Promise<EducationalElement[]> {
    return await this.repository(EducationalElement).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<EducationalElement[]> {
    return await this.repository(EducationalElement).find({ skip: initialIndex, take: limit });
  }

  public async findOneById(id: number): Promise<EducationalElement> {
    return await this.repository(EducationalElement).findOne(id);
  }

  public async count(): Promise<number> {
    return await this.repository(EducationalElement).count();
  }

  public async findOneByEducationalElementName(name: string): Promise<EducationalElement> {
    return await this.repository(EducationalElement).findOne({ where: { name: name } });
  }

  public async persist(educationalElement: EducationalElement): Promise<EducationalElement> {
    return await this.repository(EducationalElement).save(educationalElement);
  }

  public async destroy(educationalElement: EducationalElement): Promise<boolean> {
    const result = await this.repository(EducationalElement).delete(educationalElement.getId());

    return result && result.affected === 1;
  }
}
