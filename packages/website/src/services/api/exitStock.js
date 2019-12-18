import Api from './api';
import exitStockAdapter from '../adapters/exitStockAdapter';

class exitStock {
  async create(dataExitStock) {
    const body = dataExitStock;

    let createResponse;
    try {
      createResponse = await Api.post('exitStock/', body);
    } catch (err) {
      createResponse = err;
    }
    console.log(createResponse);
    return exitStockAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('exitStock/');
    } catch (err) {
      listResponse = err;
    }
    console.log(listResponse);
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
    console.log(updateResponse);
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
