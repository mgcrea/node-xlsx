import expect from 'expect';
import {build as buildXSLX, parse} from '../../src';
import {readBufferFixture, readFixture} from '../utils';

describe('node-xlsx builder', () => {
  it('should throw if no input is given', () => {
    // @ts-expect-error jest
    expect(() => buildXSLX()).toThrow();
  });
  it('should properly build an XLSX from', () => {
    const expected = readBufferFixture(`test.xlsx`);
    const worksheets = JSON.parse(readFixture(`test.json`));
    const result = buildXSLX(worksheets);
    expect(result instanceof Buffer).toBeTruthy();
    // Only check the ten first bytes
    expect(result.slice(0, 10)).toEqual(expected.slice(0, 10));
  });
  it('should handle !merges sheetOption', () => {
    const expected = readBufferFixture(`sheetOptions.xlsx`);
    const worksheets = JSON.parse(readFixture(`sheetOptions.json`));
    const result = buildXSLX(worksheets);
    expect(result instanceof Buffer).toBeTruthy();
    // Only check the ten first bytes
    expect(result.slice(0, 10)).toEqual(expected.slice(0, 10));
  });
  it('should handle global sheet options', () => {
    const worksheets = JSON.parse(readFixture(`test.json`));
    const result = buildXSLX(worksheets, {
      sheetOptions: {
        '!merges': [{s: {c: 0, r: 0}, e: {c: 0, r: 3}}],
      },
    });
    expect(result instanceof Buffer).toBeTruthy();
  });
  it('should handle global legacy options', () => {
    const worksheets = JSON.parse(readFixture(`test.json`));
    const result = buildXSLX(worksheets, {
      '!merges': [{s: {c: 0, r: 0}, e: {c: 0, r: 3}}],
    });
    expect(result instanceof Buffer).toBeTruthy();
  });
});
