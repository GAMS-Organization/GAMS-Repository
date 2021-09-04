import Api from './api';
import workOrderAdapter from '../adapters/workOrderAdapter';
import departureConsumptionStockAdapter from '../adapters/departureConsumptionStockAdapter';

class workOrder {
  async create(dataWorkOrder) {
    const body = dataWorkOrder;
    let createResponse;
    try {
      createResponse = await Api.post('workOrder/', body);
    } catch (err) {
      createResponse = err;
    }
    return workOrderAdapter.create(createResponse);
  }

  async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`workOrder/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return workOrderAdapter.list(listResponse);
  }

  async listByUser(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`workOrder/myWorkOrders/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return workOrderAdapter.list(listResponse);
  }

  async listByWorker(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`workOrder/byWorker/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return workOrderAdapter.list(listResponse);
  }

  async update(dataWorkOrder) {
    const body = dataWorkOrder;

    let updateResponse;
    try {
      updateResponse = await Api.put(`workOrder/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return workOrderAdapter.update(updateResponse);
  }

  async cancel(dataWorkOrder) {
    const body = dataWorkOrder;
    let cancelResponse;
    try {
      cancelResponse = await Api.put(`workOrder/cancel/${body.id}`, body);
    } catch (err) {
      cancelResponse = err;
    }

    return workOrderAdapter.cancel(cancelResponse);
  }

  async take(dataWorkOrder) {
    const body = dataWorkOrder;
    let takeResponse;
    try {
      takeResponse = await Api.put(`workOrder/take/${body.id}`, body);
    } catch (err) {
      takeResponse = err;
    }
    return workOrderAdapter.take(takeResponse);
  }

  async assign(dataWorkOrder) {
    const body = dataWorkOrder;
    let assignResponse;
    try {
      assignResponse = await Api.put(`workOrder/assign/${body.id}`, body);
    } catch (err) {
      assignResponse = err;
    }
    return workOrderAdapter.assign(assignResponse);
  }

  async complete(dataWorkOrder) {
    const body = dataWorkOrder;
    let completeResponse;
    try {
      completeResponse = await Api.post(`workOrder/complete/${body.id}`, body);
    } catch (err) {
      completeResponse = err;
    }
    return workOrderAdapter.complete(completeResponse);
  }

  async show(idWorkOrder) {
    let completeResponse;
    try {
      completeResponse = await Api.get(`workOrder/${idWorkOrder}`);
    } catch (err) {
      completeResponse = err;
    }
    return workOrderAdapter.show(completeResponse);
  }
}

export default new workOrder();
