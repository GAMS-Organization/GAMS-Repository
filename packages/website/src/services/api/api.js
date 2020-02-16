import axios from 'axios';
import authStorage from "../localStorage/authStorage";
import {unauthorized} from '../../utils/helpers/isError';

class ApiFetch {
  constructor() {
    this.apiUrl = process.env.API_URL ? process.env.API_URL : 'http://localhost/api/api/';
  }

  get(endpoint) {
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: 'get',
        endpoint: endpoint,
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  post(endpoint, body) {
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: 'post',
        endpoint: endpoint,
        body: body,
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  put(endpoint, body) {
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: 'put',
        endpoint: endpoint,
        body: body,
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(endpoint, body) {
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: 'delete',
        endpoint: endpoint,
        body: body,
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  makeRequest(requestData, headers = null) {
    return new Promise(async (resolve, reject) => {
      const response = await axios({
        method: requestData.method,
        url: `${this.apiUrl}${requestData.endpoint}`,
        data: requestData.body ? requestData.body : null,
        headers: { authorization: authStorage.getSession() },
      }).catch(error => {
        if(unauthorized(error.response.status)){
          window.location.replace("/");
        }
        reject(error.response);
      });
      resolve(response);
    });
  }
}

export default new ApiFetch();
