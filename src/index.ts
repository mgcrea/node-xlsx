import XLSX, {AOA2SheetOpts, ParsingOptions, Sheet2JSONOpts, utils, WritingOptions} from 'xlsx';
import {isString} from './helpers';
import {WorkBook} from './workbook';

export const parse = (mixed: unknown, options: Sheet2JSONOpts & ParsingOptions = {}) => {
  const {dateNF, header = 1, range, blankrows, defval, raw = true, rawNumbers, ...otherOptions} = options;
  const workBook = isString(mixed)
    ? XLSX.readFile(mixed, {dateNF, raw, ...otherOptions})
    : XLSX.read(mixed, {dateNF, raw, ...otherOptions});
  return Object.keys(workBook.Sheets).map((name) => {
    const sheet = workBook.Sheets[name];
    return {
      name,
      data: XLSX.utils.sheet_to_json(sheet, {
        dateNF,
        header,
        range,
        blankrows,
        defval,
        raw,
        rawNumbers,
      }),
    };
  });
};

export const parseMetadata = (mixed: unknown, parsingOptions: ParsingOptions = {}) => {
  const workBook = isString(mixed) ? XLSX.readFile(mixed, parsingOptions) : XLSX.read(mixed, parsingOptions);
  return Object.keys(workBook.Sheets).map((name) => {
    const sheet = workBook.Sheets[name];
    return {name, data: sheet['!ref'] ? XLSX.utils.decode_range(sheet['!ref']) : null};
  });
};

export type WorkSheet<T = unknown> = {
  name: string;
  data: T[][];
  options: AOA2SheetOpts;
};

export const build = (worksheets: WorkSheet[], options: WritingOptions = {}): Buffer => {
  const {bookType = 'xlsx', bookSST = false, type = 'buffer', ...otherOptions} = options;
  const workBook = worksheets.reduce<WorkBook>((soFar, {name, data, options}, index) => {
    const sheetName = name || `Sheet_${index}`;
    const sheetData = utils.aoa_to_sheet(data, options);
    soFar.SheetNames.push(sheetName);
    soFar.Sheets[sheetName] = sheetData;
    return soFar;
  }, new WorkBook());
  return XLSX.write(workBook, {bookType, bookSST, type, ...otherOptions});
};

export default {parse, parseMetadata, build};
