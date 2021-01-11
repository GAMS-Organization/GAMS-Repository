import Api from './api';
import preventiveAdapter from '../adapters/preventiveAdapter';

class preventive {
  create = async body => {
    let createResponse;
    try {
      createResponse = await Api.post('event/', body);
    } catch (err) {
      createResponse = err;
    }
    return preventiveAdapter.create(createResponse);
  };

  update = async (body, id) => {
    let updateResponse;
    try {
      updateResponse = await Api.put(`event/${id}`, body);
    } catch (err) {
      updateResponse = err;
    }
    return preventiveAdapter.update(updateResponse);
  };

  list = async (page = 1, itemsPerPage = 15) => {
    let listResponse;
    try {
      listResponse = await Api.get(`event/?page=${page}&items_per_page=${itemsPerPage}`);
    } catch (err) {
      listResponse = err;
    }
    return preventiveAdapter.list(listResponse);
  };

  listByMonth = async month => {
    let listResponse;
    try {
      listResponse = await Api.get(`event/${month}`);
    } catch (err) {
      listResponse = err;
    }
    return preventiveAdapter.listByMonth(listResponse);
  };

  delete = async id => {
    let deleteResponse;
    try {
      deleteResponse = await Api.delete(`event/${id}`);
    } catch (err) {
      deleteResponse = err;
    }
    return preventiveAdapter.delete(deleteResponse);
  };
}

export default new preventive();
