import localStorageService from './localStorageService';

class AuthStorage {
  setSession(data) {
    const { token, user } = data;
    localStorageService.set('auth-token', token);
    localStorageService.set('gams-user-roles', user.roles.toString());
    localStorageService.set('gams-user-name', user.name + ' ' + user.surname);
  }

  getSession() {
    return localStorageService.get('auth-token');
  }

  getSessionUserName() {
    return localStorageService.get('gams-user-name');
  }

  getSessionUserRoles() {
    return localStorageService.get('gams-user-roles');
  }

  deleteSession() {
    localStorageService.remove('auth-token');
    localStorageService.remove('gams-user-roles');
    localStorageService.remove('gams-user-name');
  }
}

export default new AuthStorage();
