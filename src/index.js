
import XLSX from 'xlsx';
import {buildSheetFromMatrix, isString} from './helpers';
import Workbook from './workbook';

export function parse(mixed, options = {}) {
  const workSheet = XLSX[isString(mixed) ? 'readFile' : 'read'](mixed, options);
  return Object.keys(workSheet.Sheets).map((name) => {
    const sheet = workSheet.Sheets[name];
    return {name, data: XLSX.utils.sheet_to_json(sheet, {header: 1, raw: options.raw !== false})};
  });
}

export function build(worksheets, options = {}) {
  const defaults = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  };
  const workBook = new Workbook();
  worksheets.forEach((worksheet) => {
    const name = worksheet.name || 'Sheet';
    const data = buildSheetFromMatrix(worksheet.data || [], options);
    workBook.SheetNames.push(name);
    workBook.Sheets[name] = data;
  });
  const excelData = XLSX.write(workBook, Object.assign({}, defaults, options));
  return excelData instanceof Buffer ? excelData : new Buffer(excelData, 'binary');
}

export default {parse, build};
