import { isError } from '../../utils/helpers/isError';

class workOrderAdapter {
  create(createResponse) {
    let { status, data } = createResponse;

    if (!isError(status)) {
      return {
        type: 'CREATED_SUCCESFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'CREATED_FAIL',
        error: {
          code: status,
          type: code,
          errors: 'Error al crear la orden de trabajo. Por favor revise los campos ingresados.',
        },
      };
    }
  }

  list(listResponse) {
    let { status, data } = listResponse;
    if (!isError(status)) {
      data.items = data.items.map(workOrder => {
        workOrder.orderDate = workOrder.orderDate.slice(0, 10);
        workOrder.startDate = workOrder.startDate ? workOrder.startDate.slice(0, 10) : '';
        workOrder.realizationDate = workOrder.realizationDate ? workOrder.realizationDate.slice(0, 10) : '';
        return workOrder;
      });
      return {
        ...data,
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
      const { code } = data.errors;
      return {
        type: 'UPDATED_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al actualizar la orden de trabajo. Por favor revise los campos ingresados.',
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
      const { code } = data.errors;
      return {
        type: 'DELETED_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al eliminar la orden de trabajo. Por favor intente más tarde.',
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

  cancel(dataWorkOrder) {
    let { status, data } = dataWorkOrder;
    if (!isError(status)) {
      return {
        type: 'CANCEL_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'CANCEL_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al cancelar la orden de trabajo. Por favor intente más tarde.',
        },
      };
    }
  }

  take(takeResponse) {
    let { status, data } = takeResponse;
    if (!isError(status)) {
      return {
        type: 'TAKE_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'TAKE_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al tomar la orden de trabajo. Por favor intente más tarde.',
        },
      };
    }
  }

  assign(assignResponse) {
    let { status, data } = assignResponse;
    if (!isError(status)) {
      return {
        type: 'ASSIGN_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'ASSIGN_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al asignar la orden de trabajo. Por favor intente más tarde.',
        },
      };
    }
  }

  complete(completeResponse) {
    let { status, data } = completeResponse;
    if (!isError(status)) {
      return {
        type: 'COMPLETED_SUCCESSFUL',
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'COMPLETED_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al completar la orden de trabajo. Por favor intente más tarde.',
        },
      };
    }
  }

  show(showResponse) {
    let { status, data } = showResponse;
    if (!isError(status)) {
      data.data.orderDate = data.data.orderDate.slice(0, 10);
      data.data.startDate = data.data.startDate ? data.data.startDate.slice(0, 10) : '';
      data.data.realizationDate = data.data.realizationDate ? data.data.realizationDate.slice(0, 10) : '';

      return {
        data,
      };
    } else {
      const { code } = data.errors;
      return {
        type: 'SHOW_FAIL',
        error: {
          code: status,
          type: code,
          details: 'Error al visualizar la orden de trabajo. Por favor intente más tarde.',
        },
      };
    }
  }
}

export default new workOrderAdapter();
