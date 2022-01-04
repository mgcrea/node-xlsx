import {
  AOA2SheetOpts,
  AutoFilterInfo,
  ColInfo,
  ParsingOptions,
  ProtectInfo,
  Range,
  read,
  readFile,
  RowInfo,
  Sheet2JSONOpts,
  utils,
  write,
  WritingOptions,
} from 'xlsx';
import {isString} from './helpers';
import {WorkBook} from './workbook';

export const parse = (mixed: unknown, options: Sheet2JSONOpts & ParsingOptions = {}) => {
  const {dateNF, header = 1, range, blankrows, defval, raw = true, rawNumbers, ...otherOptions} = options;
  const workBook = isString(mixed)
    ? readFile(mixed, {dateNF, raw, ...otherOptions})
    : read(mixed, {dateNF, raw, ...otherOptions});
  return Object.keys(workBook.Sheets).map((name) => {
    const sheet = workBook.Sheets[name];
    return {
      name,
      data: utils.sheet_to_json(sheet, {
        dateNF,
        header,
        range: typeof range === 'function' ? range(sheet) : range,
        blankrows,
        defval,
        raw,
        rawNumbers,
      }),
    };
  });
};

export const parseMetadata = (mixed: unknown, options: ParsingOptions = {}) => {
  const workBook = isString(mixed) ? readFile(mixed, options) : read(mixed, options);
  return Object.keys(workBook.Sheets).map((name) => {
    const sheet = workBook.Sheets[name];
    return {name, data: sheet['!ref'] ? utils.decode_range(sheet['!ref']) : null};
  });
};

export type WorkSheetOptions = {
  /** Column Info */
  '!cols'?: ColInfo[];

  /** Row Info */
  '!rows'?: RowInfo[];

  /** Merge Ranges */
  '!merges'?: Range[];

  /** Worksheet Protection info */
  '!protect'?: ProtectInfo;

  /** AutoFilter info */
  '!autofilter'?: AutoFilterInfo;
};

export type WorkSheet<T = unknown> = {
  name: string;
  data: T[][];
  options: WorkSheetOptions;
};

export type BuildOptions = WorkSheetOptions & {
  parseOptions?: AOA2SheetOpts;
  writeOptions?: WritingOptions;
  sheetOptions?: WorkSheetOptions;
};

export const build = (
  worksheets: WorkSheet[],
  {parseOptions = {}, writeOptions = {}, sheetOptions = {}, ...otherOptions}: BuildOptions = {}
): Buffer => {
  const {bookType = 'xlsx', bookSST = false, type = 'buffer', ...otherWriteOptions} = writeOptions;
  const legacyOptions = Object.keys(otherOptions).filter((key) => {
    if (['!cols', '!rows', '!merges', '!protect', '!autofilter'].includes(key)) {
      console.debug(`Deprecated options['${key}'], please use options.sheetOptions['${key}'] instead.`);
      return true;
    }
    console.debug(`Unknown options['${key}'], please use options.parseOptions / options.writeOptions`);
    return false;
  });
  const workBook = worksheets.reduce<WorkBook>((soFar, {name, data, options = {}}, index) => {
    const sheetName = name || `Sheet_${index}`;
    const sheetData = utils.aoa_to_sheet(data, parseOptions);
    soFar.SheetNames.push(sheetName);
    soFar.Sheets[sheetName] = sheetData;
    Object.assign(soFar.Sheets[sheetName], legacyOptions, sheetOptions, options);
    return soFar;
  }, new WorkBook());
  return write(workBook, {bookType, bookSST, type, ...otherWriteOptions});
};

export default {parse, parseMetadata, build};
