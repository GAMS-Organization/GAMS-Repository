import { isError } from '../../utils/helpers/isError';

class sectorAdapter {
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
          errors: 'Error al crear el sector. Por favor revise los campos ingresados.',
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
          details: 'Error al actualizar el sector. Por favor revise los campos ingresados.',
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
          details: 'Error al eliminar el sector. Por favor intente más tarde.',
        },
      };
    }
  }

  uploadMap(uploadResponse) {
    let { status, data } = uploadResponse;

    if (!isError(status)) {
      return {
        type: 'UPLOAD_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'UPLOAD_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al actualizar el mapa. Por favor intente más tarde.',
        },
      };
    }
  }

  imageMapUpload(uploadResponse) {
    let { status, data } = uploadResponse;

    if (!isError(status)) {
      return {
        type: 'UPLOAD_IMAGE_SUCCESSFUL',
        data: data,
      };
    } else {
      const { code } = data.errors;

      return {
        type: 'UPLOAD_IMAGE_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al actualizar el mapa. Por favor intente más tarde.',
        },
      };
    }
  }
}

export default new sectorAdapter();
