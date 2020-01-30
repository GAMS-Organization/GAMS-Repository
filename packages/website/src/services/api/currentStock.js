import Api from './api';
import currentStockAdapter from '../adapters/currentStockAdapter';

class currentStock {
  async create(dataCurrentStock) {
    const body = dataCurrentStock;

    let createResponse;
    try {
      createResponse = await Api.post('currentStock/', body);
    } catch (err) {
      createResponse = err;
    }
    return currentStockAdapter.create(createResponse);
  }

  async list() {
    let listResponse;
    try {
      listResponse = await Api.get('stock/');
    } catch (err) {
      listResponse = err;
    }
    return currentStockAdapter.list(listResponse);
  }

  async update(dataCurrentStock) {
    const quantity = parseInt(dataCurrentStock.quantity);
    const minimunQuantity = parseInt(dataCurrentStock.minimunQuantity);
    const body = {
      quantity,
      minimunQuantity
    };
    let updateResponse;
    try {
      updateResponse = await Api.put(`stock/${dataCurrentStock.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return currentStockAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`stock/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return currentStockAdapter.delete(deleteResponse);
  }
}

export default new currentStock();
