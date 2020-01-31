import { isError } from '../../utils/helpers/isError';

class AuthAdapter {
  login(loginResponse) {
    let { status, data } = loginResponse;

    if (!isError(status)) {
      const token = data.data.token;
      delete data.data.token;

      return {
        token,
        user: data.data,
      };
    }

      const { code, details } = data.errors;

      return {
        error: {
          code: status,
          type: code,
          errors: details.errors,
        },
      };
    }
}

export default new AuthAdapter();
