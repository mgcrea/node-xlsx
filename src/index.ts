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
} from "xlsx";

import "./config";
import { isString } from "./helpers";
import { WorkBook } from "./workbook";

const readWorkBook = (mixed: unknown, options: ParsingOptions) => {
  if (isString(mixed)) {
    return readFile(mixed, options);
  }
  // Without an explicit type, SheetJS reads a Buffer as a plain array and skips codepage decoding (#198)
  return read(mixed, Buffer.isBuffer(mixed) ? { type: "buffer", ...options } : options);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parse = <T = any[]>(mixed: unknown, options: Sheet2JSONOpts & ParsingOptions = {}) => {
  const { dateNF, header = 1, range, blankrows, defval, raw = true, rawNumbers, ...otherOptions } = options;
  const workBook = readWorkBook(mixed, { dateNF, raw, ...otherOptions });
  return Object.keys(workBook.Sheets).map((name) => {
    const sheet = workBook.Sheets[name]!;
    return {
      name,
      data: utils.sheet_to_json<T>(sheet, {
        dateNF,
        header,
        range: typeof range === "function" ? range(sheet) : range,
        blankrows,
        defval,
        raw,
        rawNumbers,
      }),
    };
  });
};

export const parseMetadata = (mixed: unknown, options: ParsingOptions = {}) => {
  const workBook = readWorkBook(mixed, options);
  return Object.keys(workBook.Sheets).map((name) => {
    const sheet = workBook.Sheets[name]!;
    return { name, data: sheet["!ref"] ? utils.decode_range(sheet["!ref"]) : null };
  });
};

export type WorkSheetOptions = {
  /** Column Info */
  "!cols"?: ColInfo[];

  /** Row Info */
  "!rows"?: RowInfo[];

  /** Merge Ranges */
  "!merges"?: Range[];

  /** Worksheet Protection info */
  "!protect"?: ProtectInfo;

  /** AutoFilter info */
  "!autofilter"?: AutoFilterInfo;
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
  { parseOptions = {}, writeOptions = {}, sheetOptions = {}, ...otherOptions }: BuildOptions = {},
): Buffer => {
  const { bookType = "xlsx", bookSST = false, type = "buffer", ...otherWriteOptions } = writeOptions;
  const legacyOptions: WorkSheetOptions = {};
  for (const [key, value] of Object.entries(otherOptions)) {
    if (["!cols", "!rows", "!merges", "!protect", "!autofilter"].includes(key)) {
      console.debug(`Deprecated options['${key}'], please use options.sheetOptions['${key}'] instead.`);
      Object.assign(legacyOptions, { [key]: value });
      continue;
    }
    console.debug(`Unknown options['${key}'], please use options.parseOptions / options.writeOptions`);
  }
  const workBook = worksheets.reduce<WorkBook>((soFar, { name, data, options = {} }, index) => {
    const sheetName = name || `Sheet_${index}`;
    const sheetData = utils.aoa_to_sheet(data, parseOptions);
    soFar.SheetNames.push(sheetName);
    soFar.Sheets[sheetName] = sheetData;
    Object.assign(soFar.Sheets[sheetName]!, legacyOptions, sheetOptions, options);
    return soFar;
  }, new WorkBook());
  return write(workBook, { bookType, bookSST, type, ...otherWriteOptions });
};

export default { parse, parseMetadata, build };
