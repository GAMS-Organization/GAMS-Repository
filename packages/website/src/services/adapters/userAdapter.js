import { isError } from '../../utils/helpers/isError';

class UserAdapter {
  create(createResponse) {
    let { status, data } = createResponse;

    if (!isError(status)) {
      return {
        type: 'CREATED_SUCCESFUL',
      };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'CREATED_FAIL',
        error: {
          code: status,
          type: code,
          errors: details.error,
        },
      };
    }
  }

  list(listResponse) {
    let { status, data } = listResponse;

    if (!isError(status)) {
      return {
        data,
      };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'LIST_FAIL',
        error: {
          code: status,
          type: code,
          errors: details.error,
        },
      };
    }
  }

  update(updateResponse) {
    let { status, data } = updateResponse;

    if (!isError(status)) {
      return {
        type: 'UPDATED_SUCCESFUL',
      };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'UPDATED_FAIL',
        error: {
          code: status,
          type: code,
          details: details,
        },
      };
    }
  }

  getById(loadResponse) {
    let { status, data } = loadResponse;

    if (!isError(status)) {
      return { ...data.data };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'LOAD_FAIL',
        error: {
          code: status,
          type: code,
          errors: details.error,
        },
      };
    }
  }

  delete(deleteResponse) {
    let { status, data } = deleteResponse;

    if (!isError(status)) {
      return {
        type: 'DELETED_SUCCESFUL',
      };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'DELETED_FAIL',
        error: {
          code: status,
          type: code,
          details: details,
        },
      };
    }
  }

  enable(deleteResponse) {
    let { status, data } = deleteResponse;

    if (!isError(status)) {
      return {
        type: 'ENABLE_SUCCESFUL',
      };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'ENABLE_FAIL',
        error: {
          code: status,
          type: code,
          details: details,
        },
      };
    }
  }
}

export default new UserAdapter();
