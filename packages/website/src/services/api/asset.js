import Api from './api';
import assetAdapter from '../adapters/assetAdapter';

class asset {
  async create(dataAsset) {
    const body = dataAsset;

    let createResponse;
    try {
      createResponse = await Api.post('asset/', body);
    } catch (err) {
      createResponse = err;
    }
    console.log(createResponse);

    return assetAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('asset/');
    } catch (err) {
      listResponse = err;
    }
    return assetAdapter.list(listResponse);
  }

  async update(dataAsset) {
    const body = dataAsset;

    let updateResponse;
    try {
      updateResponse = await Api.put(`asset/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return assetAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`asset/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return assetAdapter.delete(deleteResponse);
  }
}

export default new asset();
