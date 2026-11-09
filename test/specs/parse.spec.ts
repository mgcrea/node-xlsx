import { describe, expect, it } from "vitest";
import xlsx from "xlsx";

import { parse as parseXSLX } from "../../src";
import { readBufferFixture, readFixture } from "../utils";

describe("node-xlsx parser", () => {
  it("should throw if no input is given", () => {
    // @ts-expect-error jest
    expect(() => parseXSLX()).toThrow();
  });
  it("should properly parse an XLSX buffer", () => {
    const expected = JSON.parse(readFixture(`test.json`));
    const buffer = readBufferFixture(`test.xlsx`);
    const result = JSON.parse(JSON.stringify(parseXSLX(buffer)));
    expect(result).toEqual(expected);
  });
  it("should properly parse an XLSX file", () => {
    const expected = JSON.parse(readFixture(`test.json`));
    const file = `test/fixtures/test.xlsx`;
    const result = JSON.parse(JSON.stringify(parseXSLX(file)));
    expect(result).toEqual(expected);
  });
  it("should properly parse an XLSX file with date field", () => {
    const expected = JSON.parse(readFixture(`dateField.json`));
    const file = `test/fixtures/dateField.xlsx`;
    const result = JSON.parse(JSON.stringify(parseXSLX(file, { raw: false })));
    expect(result).toEqual(expected);
  });
  it("should properly parse an XLSX with a range option as a function", () => {
    const expected = JSON.parse(readFixture("withEmptyColumns.json"));
    const file = "test/fixtures/withEmptyColumns.xlsx";
    const result = JSON.parse(
      JSON.stringify(
        parseXSLX(file, {
          raw: true,
          header: 1,
          range: function keepEmptyColumns(sheet: xlsx.WorkSheet) {
            if (sheet["!ref"]) {
              const { s, e } = xlsx.utils.decode_range(sheet["!ref"]);
              // starts at column #1
              s.c = 0;
              return xlsx.utils.encode_range(s, e);
            }
            return sheet["!ref"];
          },
        }),
      ),
    );
    expect(result).toEqual(expected);
  });
  it("should give a range function a sheet it can read cells from", () => {
    const file = "test/fixtures/test.xlsx";
    let firstCell: unknown;
    parseXSLX(file, {
      range: (sheet: xlsx.WorkSheet) => {
        firstCell = sheet["A1"]?.v;
        return sheet["!ref"];
      },
    });
    expect(firstCell).toBeDefined();
  });
  it("should fill blank rows with defval", () => {
    const sheet = xlsx.utils.aoa_to_sheet([["a", "b"], [], [1, 2]]);
    const buffer = xlsx.write(
      { SheetNames: ["s"], Sheets: { s: sheet } },
      { type: "buffer", bookType: "xlsx" },
    );
    expect(parseXSLX(buffer, { defval: null })[0]!.data).toEqual([
      ["a", "b"],
      [null, null],
      [1, 2],
    ]);
  });
});

describe("node-xlsx parser codepages", () => {
  // Codepages other than the built-in windows ones need the tables from cpexcel (#198)
  it("should decode a shift_jis CSV buffer", () => {
    // "日本" in shift_jis
    const buffer = Buffer.from([0x93, 0xfa, 0x96, 0x7b, 0x0a]);
    const [sheet] = parseXSLX(buffer, { codepage: 932 });
    expect(sheet!.data).toEqual([["日本"]]);
  });
  it("should decode a utf8 CSV with a BOM when given codepage 65001", () => {
    const buffer = Buffer.from("\ufeffé,ü\nJosé,x\n");
    expect(parseXSLX(buffer, { codepage: 65001 })[0]!.data).toEqual([
      ["é", "ü"],
      ["José", "x"],
    ]);
  });
});
