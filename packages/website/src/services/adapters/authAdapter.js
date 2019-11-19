import { isError } from '../../utils/helpers/isError';
import { actionNames } from '../../utils/constants/actionConstants';

class AuthAdapter {
  login(loginResponse) {
    let { status, data } = loginResponse;

    if (!isError(status)) {
      const token = data.data.token;
      delete data.data.token;

      return {
        type: actionNames.loggedIn,
        token,
        user: data.data,
      };
    } else {
      const { code, details } = data.errors;

      return {
        type: actionNames.loginFailed,
        error: {
          code: status,
          type: code,
          errors: details.errors,
        },
      };
    }
  }
}

export default new AuthAdapter();
