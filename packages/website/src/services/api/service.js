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

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`service/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return serviceAdapter.list(listResponse);
  }

  async getByName(name) {
    let getByNameResponse;
    try {
      getByNameResponse = await Api.get(`service/name/${name}`);
    } catch (err) {
      getByNameResponse = err;
    }
    return serviceAdapter.getByName(getByNameResponse);
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
