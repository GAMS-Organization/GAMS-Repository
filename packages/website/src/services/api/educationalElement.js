import Api from './api';
import educationalElementAdapter from '../adapters/educationalElementAdapter';

class educationalElement {
  async create(dataEducationalElement) {
    const body = dataEducationalElement;
    let createResponse;
    try {
      createResponse = await Api.post('educational/', body);
    } catch (err) {
      createResponse = err;
    }
    return educationalElementAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`educational/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return educationalElementAdapter.list(listResponse);
  }

  async update(dataEducationalElement) {
    const body = dataEducationalElement;
    let updateResponse;
    try {
      updateResponse = await Api.put(`educational/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return educationalElementAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;
    try {
      deleteResponse = await Api.delete(`educational/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return educationalElementAdapter.delete(deleteResponse);
  }

  async createElementRequest(dataEducationalElement) {
    const body = dataEducationalElement;
    let createResponse;
    try {
      createResponse = await Api.post('elementRequest/', body);
    } catch (err) {
      createResponse = err;
    }
    return educationalElementAdapter.createElementRequest(createResponse);
  }

  async listElementRequest(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`elementRequest/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return educationalElementAdapter.listElementRequest(listResponse);
  }

  async updateElementRequest(dataEducationalElement) {
    const body = dataEducationalElement;
    let updateResponse;
    try {
      updateResponse = await Api.put(`elementRequest/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return educationalElementAdapter.updateElementRequest(updateResponse);
  }

  async deleteElementRequest(id) {
    let deleteResponse;
    try {
      deleteResponse = await Api.delete(`elementRequest/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return educationalElementAdapter.deleteElementRequest(deleteResponse);
  }
}

export default new educationalElement();
