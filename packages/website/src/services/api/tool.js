import Api from './api';
import toolAdapter from '../adapters/toolAdapter';

class tool {
  async create(dataTool) {
    const body = dataTool;
    let createResponse;
    try {
      createResponse = await Api.post('tool/', body);
    } catch (err) {
      createResponse = err;
    }
    return toolAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`tool/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return toolAdapter.list(listResponse);
  }

  async update(dataTool) {
    const body = dataTool;
    let updateResponse;
    try {
      updateResponse = await Api.put(`tool/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return toolAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;
    try {
      deleteResponse = await Api.delete(`tool/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return toolAdapter.delete(deleteResponse);
  }

  async createToolRequest(dataTool) {
    const body = dataTool;
    let createResponse;
    console.log(dataTool);
    try {
      createResponse = await Api.post('toolRequest/', body);
    } catch (err) {
      createResponse = err;
    }
    return toolAdapter.createToolRequest(createResponse);
  }

  async listToolRequest(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`toolRequest/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return toolAdapter.listToolRequest(listResponse);
  }

  async updateToolRequest(dataToolRequest) {
    const body = dataToolRequest;
    let updateResponse;
    try {
      updateResponse = await Api.put(`toolRequest/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return toolAdapter.updateToolRequest(updateResponse);
  }
}

export default new tool();
