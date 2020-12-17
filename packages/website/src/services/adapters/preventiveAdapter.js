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

  list = listResponse => {
    let { status, data } = listResponse;

    if (!isError(status)) {
      const events = data.items.map(event => {
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
}

export default new preventiveAdapter();
