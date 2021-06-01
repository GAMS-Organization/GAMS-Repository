import { isError } from '../../utils/helpers/isError';

class areaAdapter {
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

  listBySector(listBySectorResponse) {
    let { status, data } = listBySectorResponse;

    if (!isError(status)) {
      return {
        areas: data.data,
      };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'LIST_BY_SECTOR_FAIL',
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
        area: data.data,
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

  imageMapUpload(uploadResponse) {
    let { status, data } = uploadResponse;

    if (!isError(status)) {
      return {
        type: 'UPLOAD_IMAGE_SUCCESFUL',
        data: data,
      };
    } else {
      const { code, details } = data.errors;

      return {
        type: 'UPLOAD_IMAGE_FAIL',
        error: {
          code: status,
          type: code,
          details: details,
        },
      };
    }
  }
}

export default new areaAdapter();
