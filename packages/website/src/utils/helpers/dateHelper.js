import moment from 'moment';

export const toDateTime = date => {
  return moment(date).format('DD-MM-YYYY HH:mm');
};

export const toDate = date => {
  return moment(date).format('DD-MM-YYYY');
};

export const createDate = (date = null) => {
  return date ? moment(date) : moment();
};
