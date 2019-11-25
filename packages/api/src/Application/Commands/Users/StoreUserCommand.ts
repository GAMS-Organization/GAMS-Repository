export default class StoreUserCommand {
  private name: string;
  private surname: string;
  private email: string;
  private password: string;
  private roles: string[];

  public constructor(name: string, surname: string, email: string, password: string, roles: string[]) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.roles = roles;
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

  public getPassword(): string {
    return this.password;
  }

  public getRoles(): string[] {
    return this.roles;
  }
}
