import Api from './api';
import productAdapter from '../adapters/productAdapter';

class products {
  async create(dataProduct) {
    const body = dataProduct;

    let createResponse;
    try {
      createResponse = await Api.post('products/', body);
    } catch (err) {
      createResponse = err;
    }
    console.log(createResponse);
    return productAdapter.create(createResponse);
  }

  /*async list() {
    let listResponse;
    try {
      listResponse = await Api.get('products/');
    } catch (err) {
      listResponse = err;
    }

    return productAdapter.list(listResponse);
  }*/

  async update(dataProduct) {
    const body = dataProduct;

    let updateResponse;
    try {
      updateResponse = await Api.put(`products/${body.id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    console.log(updateResponse);
    return productAdapter.update(updateResponse);
  }

  async delete(id) {
    let deleteResponse;

    try {
      deleteResponse = await Api.delete(`products/${id}`);
    } catch (err) {
      deleteResponse = err;
    }

    return productAdapter.delete(deleteResponse);
  }
}

export default new products();
