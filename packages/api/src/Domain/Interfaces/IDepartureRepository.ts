import Departure from '../Entities/Departure';

export default interface IDepartureRepository {
  findAll(): Promise<Departure[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Departure[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<Departure>;
  findByProductName(id: number): Promise<Departure[]>;
  persist(departure: Departure): Promise<Departure>;
  destroy(departure: Departure): Promise<boolean>;
}
