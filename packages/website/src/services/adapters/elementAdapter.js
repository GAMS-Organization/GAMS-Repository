import { isError } from '../../utils/helpers/isError';

class elementAdapter {
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
          errors: 'Error al crear el elemento. Por favor revise los campos ingresados.',
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
          details: 'Error al actualizar el elemento. Por favor revise los campos ingresados.',
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

  getByAreaId(loadResponse) {
    let { status, data } = loadResponse;

    if (!isError(status)) {
      return data.data;
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
          details: 'Error al eliminar el elemento. Por favor intente más tarde.',
        },
      };
    }
  }
}

export default new elementAdapter();
