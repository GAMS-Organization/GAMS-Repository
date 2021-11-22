/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserRole from './UserRole';

@Entity('roles')
// eslint-disable-next-line require-jsdoc
export default class Role {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @OneToMany(_type => UserRole, userRole => userRole.role)
  public userRoles: UserRole[];

  public constructor(name: string) {
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
