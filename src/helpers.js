import XLSX from 'xlsx';

const isBoolean = maybeBoolean => typeof maybeBoolean === 'boolean';
const isNumber = maybeNumber => typeof maybeNumber === 'number';
const isString = maybeString => typeof maybeString === 'string';

const originDate = new Date(Date.UTC(1899, 11, 30));

const buildExcelDate = (value, is1904) => {
  const epoch = Date.parse(value + (is1904 ? 1462 : 0));
  return (epoch - originDate) / (864e5);
};

const buildSheetFromMatrix = (data, options = {}) => {
  const workSheet = {};
  const range = {s: {c: 1e7, r: 1e7}, e: {c: 0, r: 0}};

  if (!Array.isArray(data)) throw new Error('sheet data is not array');

  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (!Array.isArray(data[R])) throw new Error(`${R}th row data is not array`);

      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      if (data[R][C] === null) {
        continue; // eslint-disable-line
      }
      const cell = {v: data[R][C]};
      const cellRef = XLSX.utils.encode_cell({c: C, r: R});
      if (isNumber(cell.v)) {
        cell.t = 'n';
      } else if (isBoolean(cell.v)) {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'd';
        cell.v = cell.v.toISOString();
      } else {
        cell.t = 's';
      }
      workSheet[cellRef] = cell;
    }
  }
  if (range.s.c < 1e7) {
    workSheet['!ref'] = XLSX.utils.encode_range(range);
  }
  if (options['!cols']) {
    workSheet['!cols'] = options['!cols'];
  }
  if (options['!merges']) {
    workSheet['!merges'] = options['!merges'];
  }
  return workSheet;
};

export {buildSheetFromMatrix, isBoolean, isNumber, isString};
