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
    return userAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`users/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return userAdapter.list(listResponse);
  }

  async update(dataUser) {
    const body = dataUser;

    let updateResponse;
    try {
      updateResponse = await Api.put(`users/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return userAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`users/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return userAdapter.delete(deleteResponse);
  }
}

export default new User();
