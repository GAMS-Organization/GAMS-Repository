import Api from './api';
import userAdapter from '../adapters/userAdapter';

class User {
  async create(dataUser) {
    const body = dataUser;

    let createResponse;
    try {
      createResponse = await Api.post('users/', body);
    } catch (err) {
      createResponse = err;
    }
    console.log(createResponse);
    return userAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('users/');
    } catch (err) {
      listResponse = err;
    }

    return userAdapter.list(listResponse);
  }
}

export default new User();
