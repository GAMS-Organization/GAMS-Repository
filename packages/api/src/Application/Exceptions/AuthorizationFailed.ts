import ApplicationError from './ApplicationError';

export default class AuthorizationFailed extends ApplicationError {
  public constructor(message: string) {
    super(AuthorizationFailed.name, message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
