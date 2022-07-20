import ApplicationError from './ApplicationError';

export default class CannotUpdateEntity extends ApplicationError {
  public constructor(message?: string) {
    super(CannotUpdateEntity.name, message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
