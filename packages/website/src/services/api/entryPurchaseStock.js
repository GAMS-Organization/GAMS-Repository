import Api from './api';
import entryPurchaseStockAdapter from '../adapters/entryPurchaseStockAdapter';

class entryPurchaseStock {
  async create(dataEntryStock) {
    const body = dataEntryStock;

    let createResponse;
    try {
      createResponse = await Api.post('entry/', body);
    } catch (err) {
      createResponse = err;
    }
    return entryPurchaseStockAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`entry/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return entryPurchaseStockAdapter.list(listResponse);
  }

  async getById(idEntry) {
    let listResponse;
    try {
      listResponse = await Api.get(`entry/${idEntry}`);
    } catch (err) {
      listResponse = err;
    }
    return entryPurchaseStockAdapter.list(listResponse);
  }

  async update(dataEntryStock) {
    const body = dataEntryStock;

    let updateResponse;
    try {
      updateResponse = await Api.put(`entry/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return entryPurchaseStockAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`entry/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return entryPurchaseStockAdapter.delete(deleteResponse);
  }
}

export default new entryPurchaseStock();
