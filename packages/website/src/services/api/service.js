import Api from './api';
import serviceAdapter from '../adapters/serviceAdapter';

class service {
  async create(dataService) {
    const body = dataService;

    let createResponse;
    try {
      createResponse = await Api.post('service/', body);
    } catch (err) {
      createResponse = err;
    }
    return serviceAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('service/');
    } catch (err) {
      listResponse = err;
    }

    return serviceAdapter.list(listResponse);
  }

  async update(dataService) {
    const body = dataService;

    let updateResponse;
    try {
      updateResponse = await Api.put(`service/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return serviceAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`service/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return serviceAdapter.delete(deleteResponse);
  }
}

export default new service();
