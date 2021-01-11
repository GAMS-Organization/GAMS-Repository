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

    const { code } = data.errors;

    if (code === 'NOT_FOUND') {
      return {
        error: {
          status: 404,
          code: 'User not found',
          details: 'El usuario no existe',
        },
      };
    } else {
      return {
        error: {
          status: 401,
          code: 'Unhautorized',
          details: 'Contraseña incorrecta',
        },
      };
    }
  }
}

export default new AuthAdapter();
