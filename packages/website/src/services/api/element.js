import Api from './api';
import elementAdapter from '../adapters/elementAdapter';

class element {
  async create(dataElement) {
    const body = dataElement;

    let createResponse;
    try {
      createResponse = await Api.post('element/', body);
    } catch (err) {
      createResponse = err;
    }
    return elementAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('element/');
    } catch (err) {
      listResponse = err;
    }
    return elementAdapter.list(listResponse);
  }

  async update(dataElement) {
    const body = dataElement;

    let updateResponse;
    try {
      updateResponse = await Api.put(`element/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return elementAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`element/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return elementAdapter.delete(deleteResponse);
  }
}

export default new element();
