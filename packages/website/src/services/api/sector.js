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

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`sector/?page=${page}&items_per_page=${itemsPerPage}`);
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

  async imageMapUpload(formDataImage, id) {
    let loadResponse;
    try {
      loadResponse = await Api.post(`sector/map/${id}`, formDataImage, { 'Content-Type': 'multipart/form-data' });
    } catch (err) {
      loadResponse = err;
    }
    console.log(loadResponse);

    return sectorAdapter.imageMapUpload(loadResponse);
  }
}

export default new sector();
