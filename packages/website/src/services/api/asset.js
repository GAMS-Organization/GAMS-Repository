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

    return assetAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`asset/?page=${page}&items_per_page=${itemsPerPage}`);
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

  async get(dataAsset) {
    const body = dataAsset;

    let assetResponse;
    try {
      assetResponse = await Api.get(
        `asset/filters?sector=${body.sector}&area=${body.area}&service=${body.service}&element=${body.element}`,
      );
    } catch (err) {
      assetResponse = err;
    }
    return assetAdapter.get(assetResponse);
  }
}

export default new asset();
