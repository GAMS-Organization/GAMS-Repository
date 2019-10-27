import Education from '../Entities/Education';

export default interface IEducationRepository {
  findAll(): Promise<Education[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Education[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<Education>;
  persist(userRole: Education): Promise<Education>;
  destroy(userRol: Education): Promise<boolean>;
}
