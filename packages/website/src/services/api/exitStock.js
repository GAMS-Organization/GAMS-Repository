import Api from './api';
import exitStockAdapter from '../adapters/exitStockAdapter';
import serviceAdapter from '../adapters/serviceAdapter';

class exitStock {
  async create(dataExitStock) {
    const body = dataExitStock;

    let createResponse;
    try {
      createResponse = await Api.post('exitStock/', body);
    } catch (err) {
      createResponse = err;
    }
    return exitStockAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`departure/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return exitStockAdapter.list(listResponse);
  }

  async update(dataExitStock) {
    const body = dataExitStock;

    let updateResponse;
    try {
      updateResponse = await Api.put(`exitStock/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return exitStockAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`exitStock/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return exitStockAdapter.delete(deleteResponse);
  }
}

export default new exitStock();
