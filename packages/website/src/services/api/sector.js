import Api from './api';
import sectorAdapter from '../adapters/sectorAdapter';

class sector {
  async create(dataSector) {
    const body = dataSector;

    let createResponse;
    try {
      createResponse = await Api.post('sector/', body);
    } catch (err) {
      createResponse = err;
    }
    return sectorAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('sector/?page=1&items_per_page=50');
    } catch (err) {
      listResponse = err;
    }
    return sectorAdapter.list(listResponse);
  }

  async update(dataSector) {
    const body = dataSector;

    let updateResponse;
    try {
      updateResponse = await Api.put(`sector/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return sectorAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`sector/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return sectorAdapter.delete(deleteResponse);
  }
}

export default new sector();
