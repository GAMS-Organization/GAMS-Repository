import Api from './api';
import workOrderAdapter from '../adapters/workOrderAdapter';

class workOrder {
  async create(dataWorkOrder) {
    console.log(dataWorkOrder);
    const body = dataWorkOrder;
    console.log(body);
    let createResponse;
    try {
      createResponse = await Api.post('workorder/', body);
    } catch (err) {
      createResponse = err;
    }
    return workOrderAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`workorder/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return workOrderAdapter.list(listResponse);
  }

  async update(dataWorkOrder) {
    const body = dataWorkOrder;

    let updateResponse;
    try {
      updateResponse = await Api.put(`workorder/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return workOrderAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`workorder/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return workOrderAdapter.delete(deleteResponse);
  }
}

export default new workOrder();
