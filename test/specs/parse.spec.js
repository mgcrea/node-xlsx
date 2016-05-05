import fs from 'fs';
import expect from 'expect';
import {parse as parseXSLX} from './../../src';

describe('node-xlsx parser', () => {
  it('should throw if no input is given', () => {
    expect(() => parseXSLX()).toThrow();
  });
  it('should properly parse an XLSX buffer', () => {
    const expected = JSON.parse(fs.readFileSync(`${__dirname}/../fixtures/test.json`));
    const buffer = fs.readFileSync(`${__dirname}/../fixtures/test.xlsx`);
    const result = JSON.parse(JSON.stringify(parseXSLX(buffer)));
    expect(result).toEqual(expected);
  });
  it('should properly parse an XLSX file', () => {
    const expected = JSON.parse(fs.readFileSync(`${__dirname}/../fixtures/test.json`));
    const file = `${__dirname}/../fixtures/test.xlsx`;
    const result = JSON.parse(JSON.stringify(parseXSLX(file)));
    expect(result).toEqual(expected);
  });
});
