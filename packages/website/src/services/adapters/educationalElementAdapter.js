import { isError } from '../../utils/helpers/isError';

class educationalElementAdapter {
  create(createResponse) {
    let { status, data } = createResponse;

    if (!isError(status)) {
      return {
        type: 'CREATED_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'CREATED_FAIL',
        error: {
          code: status,
          type: code,
          errors: 'Error al crear el elemento educacional. Por favor revise los campos ingresados.',
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
        type: 'UPDATED_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'UPDATED_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al actualizar el elemento educacional. Por favor intente más tarde.',
        },
      };
    }
  }

  delete(deleteResponse) {
    let { status, data } = deleteResponse;

    if (!isError(status)) {
      return {
        type: 'DELETED_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'DELETED_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al eliminar el elemento educacional. Por favor intente más tarde.',
        },
      };
    }
  }

  createElementRequest(createResponse) {
    let { status, data } = createResponse;
    if (!isError(status)) {
      return {
        type: 'CREATED_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'CREATED_FAIL',
        error: {
          code: status,
          type: code,
          errors: 'Error al crear la solicitud. Por favor revise los campos ingresados.',
        },
      };
    }
  }

  listElementRequest(listResponse) {
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

  updateElementRequest(updateResponse) {
    let { status, data } = updateResponse;

    if (!isError(status)) {
      return {
        type: 'UPDATED_SUCCESSFUL',
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

  deleteElementRequest(deleteResponse) {
    let { status, data } = deleteResponse;

    if (!isError(status)) {
      return {
        type: 'DELETED_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'DELETED_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al eliminar la solicitud. Por favor intente más tarde.',
        },
      };
    }
  }
}

export default new educationalElementAdapter();
