import moment from 'moment';

export const myDateFormat = (date: moment.MomentInput) => {
  return date ? moment(date).format('DD/MM/YYYY HH:mm:ss') : '';
};

export const myTimeFormat = (date: moment.MomentInput) => {
  return date ? moment(date).format('HH:mm:ss') : '';
};

export const excelDateFormat = (date: moment.MomentInput) => {
  return date ? moment(date).format('DD.MM.YYYY HH:mm:ss') : '';
};
