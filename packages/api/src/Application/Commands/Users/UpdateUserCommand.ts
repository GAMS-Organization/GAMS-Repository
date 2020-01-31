import { UserStates } from '../../../Domain/Enums/UserStates';

export default class UpdateUserCommand {
  private id: number;
  private name: string;
  private surname: string;
  private email: string;
  private roles: string[];
  private userState: UserStates;

  public constructor(id: number, name: string, surname: string, email: string, roles: string[], userState: UserStates) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.roles = roles;
    this.userState = userState;
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
}
