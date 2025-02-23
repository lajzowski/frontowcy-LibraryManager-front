import moment from 'moment/moment';

export const myDateSorter = (a: moment.MomentInput, b: moment.MomentInput) => {
  const dataA = a === null ? 0 : moment(a).unix();
  const dataB = b === null ? 0 : moment(b).unix();
  return dataA - dataB;
};

export const myNumberSorter = (a: string | number, b: string | number) =>
  Number(a) - Number(b);

export const myStringSorter = (a = '', b = '') =>
  a.localeCompare(b, undefined, {
    numeric: true,
  });
