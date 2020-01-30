import Api from './api';
import productAdapter from '../adapters/productAdapter';

class products {
  async create(dataProduct) {
    const body = dataProduct;

    let createResponse;
    try {
      createResponse = await Api.post('product/', body);
    } catch (err) {
      createResponse = err;
    }
    return productAdapter.create(createResponse);
  }

  async list(page, itemsPerPage) {
    let listResponse;
    try {
      if(page && itemsPerPage){
        listResponse = await Api.get(`product/?page=${page}&items_per_page=${itemsPerPage}`);
      }
      else{
        listResponse = await Api.get(`product/`);
      }
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
  }
}

export default new products();
