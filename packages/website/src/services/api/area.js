import Api from './api';
import areaAdapter from '../adapters/areaAdapter';

class area {
  async create(dataArea) {
    const body = dataArea;

    let createResponse;
    try {
      createResponse = await Api.post('area/', body);
    } catch (err) {
      createResponse = err;
    }
    return areaAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('area/');
    } catch (err) {
      listResponse = err;
    }
    return areaAdapter.list(listResponse);
  }

  async update(dataArea) {
    const body = dataArea;

    let updateResponse;
    try {
      updateResponse = await Api.put(`area/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return areaAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`area/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return areaAdapter.delete(deleteResponse);
  }
}

export default new area();
