import { isError } from '../../utils/helpers/isError';
import { createDate, createDateTime, toDate } from '../../utils/helpers/dateHelper';

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
      data.items = data.items.map(event => {
        event.startDate = toDate(event.startDate);
        event.endDate = toDate(event.endDate);
        return event;
      });

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
        const workers = event.workers
          ? event.workers.map(worker => {
              return worker.user.id;
            })
          : [];
        return {
          title: event.title,
          start: createDate(event.startDate).add(3, 'hours'),
          end: createDate(event.endDate).add(3, 'hours'),
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
