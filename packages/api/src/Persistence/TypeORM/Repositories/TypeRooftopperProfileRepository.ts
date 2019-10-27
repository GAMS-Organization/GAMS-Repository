import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import RooftopperProfile from '../../../Domain/Entities/RooftopperProfile';

@injectable()
export default class TypeRooftopperProfileRepository extends TypeRepository implements IRooftopperProfileRepository {
  public async findAll(): Promise<RooftopperProfile[]> {
    return await this.repository(RooftopperProfile).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<RooftopperProfile[]> {
    return await this.repository(RooftopperProfile).find({ skip: initialIndex, take: limit });
  }

  public async count(): Promise<number> {
    return await this.repository(RooftopperProfile).count();
  }

  public async findOneById(id: number): Promise<RooftopperProfile> {
    return await this.repository(RooftopperProfile).findOne(id);
  }

  public async findOneByRooftopperSlug(slug: string): Promise<RooftopperProfile> {
    return await this.repository(RooftopperProfile).findOne({ where: { slug: slug } });
  }

  public async persist(profile: RooftopperProfile): Promise<RooftopperProfile> {
    return await this.repository(RooftopperProfile).save(profile);
  }

  public async destroy(profile: RooftopperProfile): Promise<boolean> {
    const result = await this.repository(RooftopperProfile).delete(profile.getId());

    return result && result.affected === 1;
  }
}
