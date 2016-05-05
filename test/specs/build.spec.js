import fs from 'fs';
import expect from 'expect';
import {build as buildXSLX} from './../../src';

describe('node-xlsx builder', () => {
  it('should throw if no input is given', () => {
    expect(() => buildXSLX()).toThrow();
  });
  it('should properly build an XLSX from ', () => {
    const expected = fs.readFileSync(`${__dirname}/../fixtures/test.xlsx`);
    const worksheets = JSON.parse(fs.readFileSync(`${__dirname}/../fixtures/test.json`));
    const result = buildXSLX(worksheets);
    expect(result).toBeA(Buffer);
    // Only check the ten first bytes
    expect(result.slice(0, 10)).toEqual(expected.slice(0, 10));
  });
});
