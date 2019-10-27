import { UserStates } from '../../../Domain/Enums/UserStates';

export default class UpdateUserCommand {
  private id: number;
  private name: string;
  private surname: string;
  private email: string;
  private roles: string[];
  private userState: UserStates;
  private username: string;

  public constructor(
    id: number,
    name: string,
    surname: string,
    email: string,
    roles: string[],
    userState: UserStates,
    username: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.roles = roles;
    this.userState = userState;
    this.username = username;
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

  public getRoles(): string[] {
    return this.roles;
  }

  public getUserState(): UserStates {
    return this.userState;
  }

  public getUsername(): string {
    return this.username;
  }
}
