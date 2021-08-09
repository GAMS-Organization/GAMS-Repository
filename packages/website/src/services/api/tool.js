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

  /*async list(page = 1, itemsPerPage = 15) {
    let listResponse;
    try {
      listResponse = await Api.get(`product/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return productAdapter.list(listResponse);
  }

  async update(dataProduct) {
    const body = dataProduct;
    let updateResponse;
    try {
      updateResponse = await Api.put(`product/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return productAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`product/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return productAdapter.delete(deleteResponse);
  }*/
}

export default new tool();
