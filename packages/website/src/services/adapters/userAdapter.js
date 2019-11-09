import { isError } from '../../utils/helpers/isError';

class UserAdapter {
  create(createResponse) {
    let { status, data } = createResponse;

    if (!isError(status)) {
      return {
        type: 'CREATED_SUCCESFUL',
        message: 'El usuario ha sido creado',
      };
    } else {
      const { code, details } = data.errors;

      return {
        type: 'CREATED_FAIL',
        message: 'Ha ocurrido un error',
        error: {
          code: status,
          type: code,
          errors: details.errors,
        },
      };
    }
  }
}

export default new UserAdapter();
