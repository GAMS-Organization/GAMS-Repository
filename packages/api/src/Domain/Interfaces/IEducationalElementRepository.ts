import EducationalElement from '../Entities/EducationalElement';

export default interface IEducationalElementRepository {
  findAll(): Promise<EducationalElement[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<EducationalElement[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<EducationalElement>;
  findOneByEducationalElementName(name: string): Promise<EducationalElement>;
  persist(educationalElement: EducationalElement): Promise<EducationalElement>;
  destroy(educationalElement: EducationalElement): Promise<boolean>;
}
