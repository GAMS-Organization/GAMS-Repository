import { isError } from '../../utils/helpers/isError';
import { createDateTime } from '../../utils/helpers/dateHelper';

class preventiveAdapter {
  create = createResponse => {
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
          errors: details,
        },
      };
    }
  };

  update = updateResponse => {
    let { status, data } = updateResponse;

    if (!isError(status)) {
      return {
        type: 'UPDATED_SUCCESSFULLY',
      };
    } else {
      const { code, details } = data.errors;
      return {
        type: 'UPDATED_UNSUCCESSFULLY',
        error: {
          code: status,
          type: code,
          errors: details,
        },
      };
    }
  };

  list = listResponse => {
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
  };

  listByMonth = listResponse => {
    let { status, data } = listResponse;

    if (!isError(status)) {
      const events = data.data.map(event => {
        const workers = event.workers.map(worker => {
          return worker.user.id;
        });
        return {
          title: event.title,
          start: createDateTime(event.startDate).toDate(),
          end: createDateTime(event.endDate).toDate(),
          allDay: event.allDay,
          resource: {
            description: event.description,
            workers,
            id: event.id,
          },
        };
      });

      return {
        events,
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
  };

  delete = deleteResponse => {
    let { status, data } = deleteResponse;

    if (!isError(status)) {
      return {
        type: 'DELETED_SUCCESSFULLY',
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
  };
}

export default new preventiveAdapter();
