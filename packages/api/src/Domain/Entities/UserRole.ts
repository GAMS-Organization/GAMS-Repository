/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Role from './Role';
import User from './User';

@Entity('user_roles')
// eslint-disable-next-line require-jsdoc
export default class UserRole {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => User, user => user.userRoles)
  public user: User;
  @ManyToOne(_type => Role, role => role.userRoles)
  public role: Role;

  public constructor(user: User, role: Role) {
    this.user = user;
    this.role = role;
  }

  public getId(): number {
    return this.id;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(value: User): void {
    this.user = value;
  }

  public getRole(): Role {
    return this.role;
  }

  public setRole(value: Role): void {
    this.role = value;
  }
}
