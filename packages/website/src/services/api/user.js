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

    console.log('respuesta dentro del userApi', createResponse);
    return userAdapter.create(createResponse);
  }
}

export default new User();
