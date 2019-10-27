import ApplicationError from './ApplicationError';

export default class AuthenticationFailed extends ApplicationError {
  public constructor(message: string) {
    super(AuthenticationFailed.name, message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
