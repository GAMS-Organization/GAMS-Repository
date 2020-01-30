import Api from './api';
import authAdapter from '../adapters/authAdapter';
import authStorage from "../localStorage/authStorage";

class Auth {
  async logIn(email, password) {
    const body = { email, password };

    let loginResponse;
    try {
      loginResponse = await Api.post('auth/login', body);
    } catch (err) {
      loginResponse = err;
    }

    const responseAdapted = authAdapter.login(loginResponse);

    if(responseAdapted.token){
      authStorage.setSession(responseAdapted.token);
    }
    return authAdapter.login(loginResponse);
  }

  async logOut() {
      authStorage.deleteSession();
  }
}

export default new Auth();
