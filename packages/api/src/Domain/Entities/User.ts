/* eslint-disable new-cap */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import UserRole from './UserRole';
import { UserStates } from '../Enums/UserStates';

@Entity('users')
// eslint-disable-next-line require-jsdoc
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  public surname: string;
  @Column( { unique: true })
  public email: string;
  @Column()
  public password: string;
  @Column({ default: UserStates.user_active })
  public state: UserStates;
  @OneToMany(_type => UserRole, userRole => userRole.user)
  public userRoles: UserRole[];
  @Column()
  @CreateDateColumn()
  public createdAt: Date;
  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  public constructor(name: string, surname: string, email: string, state?: UserStates) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    if (state) {
      this.state = state;
    } else {
      this.state = UserStates.user_active;
    }
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSurname(): string {
    return this.surname;
  }

  public getEmail(): string {
    return this.email;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setSurname(surname: string): void {
    this.surname = surname;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setUserState(state: UserStates): void {
    this.state = state;
  }

  public getUserState(): UserStates {
    return this.state;
  }

  public getUserRole(): UserRole[] {
    return this.userRoles;
  }

  public setUserRole(value: UserRole[]): void {
    this.userRoles = value;
  }

  public getRolesFromUserRole(): string[] {
    const roles = [];
    for (const userRole of this.userRoles) {
      roles.push(userRole.getRole().getName());
    }
    return roles;
  }

  public hashPassword(newPassword: string): void {
    this.password = bcrypt.hashSync(newPassword, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
