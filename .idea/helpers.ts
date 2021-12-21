import XLSX from 'xlsx';

const ORIGIN_DATE = new Date(Date.UTC(1899, 11, 30));

export const isBoolean = (maybeBoolean: unknown): maybeBoolean is boolean => typeof maybeBoolean === 'boolean';
export const isNumber = (maybeNumber: unknown): maybeNumber is number => typeof maybeNumber === 'number';
export const isString = (maybeString: unknown): maybeString is string => typeof maybeString === 'string';
// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (maybeObject: unknown): maybeObject is Object =>
  maybeObject !== null && typeof maybeObject === 'object';
export const isCellDescriptor = (maybeCell: unknown) => isObject(maybeCell) && 'v' in maybeCell;

const SUPPORTED_WS_OPTIONS = ['!cols', '!rows', '!merges', '!autofilter', '!protect'];

export const buildExcelDate = (value: number, is1904: boolean) => {
  const epoch = Date.parse(value + (is1904 ? 1462 : 0));
  return (epoch - ORIGIN_DATE.getTime()) / 864e5;
};

export const buildSheetFromMatrix = (data, options = {}) => {
  const workSheet = {};
  const range = {s: {c: 1e7, r: 1e7}, e: {c: 0, r: 0}};

  if (!Array.isArray(data)) throw new Error('sheet data is not array');

  for (let R = 0; R !== data.length; R += 1) {
    for (let C = 0; C !== data[R].length; C += 1) {
      if (!Array.isArray(data[R])) throw new Error(`${R}th row data is not array`);

      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      if (data[R][C] === null) {
        continue; // eslint-disable-line
      }
      const cell = isCellDescriptor(data[R][C]) ? data[R][C] : {v: data[R][C]};
      const cellRef = XLSX.utils.encode_cell({c: C, r: R});
      if (isNumber(cell.v)) {
        cell.t = 'n';
      } else if (isBoolean(cell.v)) {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.v = buildExcelDate(cell.v);
        cell.z = cell.z || XLSX.SSF._table[14]; // eslint-disable-line no-underscore-dangle

        /* eslint-disable spaced-comment, no-trailing-spaces */
        /***
         * Allows for an non-abstracted representation of the data
         *
         * example: {t:'n', z:10, f:'=AVERAGE(A:A)'}
         *
         * Documentation:
         * - Cell Object: https://sheetjs.gitbooks.io/docs/#cell-object
         * - Data Types: https://sheetjs.gitbooks.io/docs/#data-types
         * - Format: https://sheetjs.gitbooks.io/docs/#number-formats
         **/
        /* eslint-disable spaced-comment, no-trailing-spaces */
      } else if (isObject(cell.v)) {
        cell.t = cell.v.t;
        cell.f = cell.v.f;
        cell.F = cell.v.F;
        cell.z = cell.v.z;
      } else {
        cell.t = 's';
      }
      if (isNumber(cell.z)) cell.z = XLSX.SSF._table[cell.z]; // eslint-disable-line no-underscore-dangle
      workSheet[cellRef] = cell;
    }
  }
  if (range.s.c < 1e7) {
    workSheet['!ref'] = XLSX.utils.encode_range(range);
  }
  SUPPORTED_WS_OPTIONS.forEach((option) => {
    if (options[option]) {
      workSheet[option] = options[option];
    }
  });
  return workSheet;
};
