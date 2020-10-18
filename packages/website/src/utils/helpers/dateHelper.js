import moment from 'moment';

export const toDateTime = date => {
  return moment(date).format('DD-MM-YYYY HH:mm');
};

export const toDate = date => {
  return moment(date).format('DD-MM-YYYY');
};

export const toTime = date => {
  return moment(date).format('HH:mm');
};

export const createDate = (date = null) => {
  return date ? moment(date) : moment();
};

export const createDateTime = (date, time) => {
  if (time) {
    return moment(date + ' ' + time, 'DD-MM-YYYY HH:mm');
  }
  return moment(date, 'DD-MM-YYYY HH:mm');
};
