import RooftopperProfile from '../Entities/RooftopperProfile';

export default interface IRooftopperProfileRepository {
  findAll(): Promise<RooftopperProfile[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<RooftopperProfile[]>;
  count(): Promise<number>;
  findOneByRooftopperSlug(slug: string): Promise<RooftopperProfile>;
  findOneById(id: number): Promise<RooftopperProfile>;
  persist(profile: RooftopperProfile): Promise<RooftopperProfile>;
  destroy(profile: RooftopperProfile): Promise<boolean>;
}
