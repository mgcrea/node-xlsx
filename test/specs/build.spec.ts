import expect from 'expect';
import {build as buildXSLX} from '../../src';
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
});
