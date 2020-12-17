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

  list = async () => {
    let listResponse;
    try {
      listResponse = await Api.get('event/');
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
}

export default new preventive();
