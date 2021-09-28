import { isError } from '../../utils/helpers/isError';

class toolAdapter {
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

  createToolRequest(createResponse) {
    let { status, data } = createResponse;
    console.log();
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
}

export default new toolAdapter();
