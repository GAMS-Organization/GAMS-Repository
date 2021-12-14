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

  async getById(userId) {
    let loadResponse;
    try {
      loadResponse = await Api.get(`users/${userId}`);
    } catch (err) {
      loadResponse = err;
    }
    return userAdapter.getById(loadResponse);
  }

  async delete(id) {
    let deleteResponse;
    try {
      deleteResponse = await Api.get(`users/${id}/Disable`);
    } catch (err) {
      deleteResponse = err;
    }
    return userAdapter.delete(deleteResponse);
  }

  async enable(id) {
    let enableResponse;
    try {
      enableResponse = await Api.get(`users/${id}/Enable`);
    } catch (err) {
      enableResponse = err;
    }
    return userAdapter.enable(enableResponse);
  }
}

export default new User();
