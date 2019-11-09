import localStorage from 'localStorage';

class LocalStorageService {
  get(key) {
    return localStorage.getItem(key);
  }

  set(key, data) {
    localStorage.setItem(key, data);
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorageService();
