import expect from 'expect';
import {parse as parseXSLX} from '../../src';
import {readFixture, readBufferFixture} from '../utils';

describe('node-xlsx parser', () => {
  it('should throw if no input is given', () => {
    // @ts-expect-error jest
    expect(() => parseXSLX()).toThrow();
  });
  it('should properly parse an XLSX buffer', () => {
    const expected = JSON.parse(readFixture(`test.json`));
    const buffer = readBufferFixture(`test.xlsx`);
    const result = JSON.parse(JSON.stringify(parseXSLX(buffer)));
    expect(result).toEqual(expected);
  });
  it('should properly parse an XLSX file', () => {
    const expected = JSON.parse(readFixture(`test.json`));
    const file = `test/fixtures/test.xlsx`;
    const result = JSON.parse(JSON.stringify(parseXSLX(file)));
    expect(result).toEqual(expected);
  });
  it('should properly parse an XLSX file with date field', () => {
    const expected = JSON.parse(readFixture(`dateField.json`));
    const file = `test/fixtures/dateField.xlsx`;
    const result = JSON.parse(JSON.stringify(parseXSLX(file, {raw: false})));
    expect(result).toEqual(expected);
  });
});
