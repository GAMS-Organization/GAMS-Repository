import Api from './api';
import authAdapter from '../adapters/authAdapter';

class Auth {
  async logIn(username, password) {
    const body = { username, password };

    let loginResponse;
    try {
      loginResponse = await Api.post('auth/login', body);
    } catch (err) {
      loginResponse = err;
    }

    return authAdapter.login(loginResponse);
  }
}

export default new Auth();
