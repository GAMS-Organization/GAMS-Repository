import Api from './api';
import departureConsumptionStockAdapter from '../adapters/departureConsumptionStockAdapter';

class departureConsumptionStock {
  async create(dataDepartureStock) {
    const body = dataDepartureStock;

    let createResponse;
    try {
      createResponse = await Api.post('departure/', body);
    } catch (err) {
      createResponse = err;
    }
    return departureConsumptionStockAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`departure/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return departureConsumptionStockAdapter.list(listResponse);
  }

  async getById(idDeparture) {
    let listResponse;
    try {
      listResponse = await Api.get(`departure/${idDeparture}`);
    } catch (err) {
      listResponse = err;
    }
    return departureConsumptionStockAdapter.list(listResponse);
  }

  async update(dataDepartureStock) {
    const body = dataDepartureStock;

    let updateResponse;
    try {
      updateResponse = await Api.put(`departure/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return departureConsumptionStockAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`departure/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return departureConsumptionStockAdapter.delete(deleteResponse);
  }
}

export default new departureConsumptionStock();
