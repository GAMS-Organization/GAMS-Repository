import ApplicationError from './ApplicationError';

export default class ServerError extends ApplicationError {
  public constructor(message: string) {
    super(ServerError.name, message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
