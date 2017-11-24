import expect from 'expect';
import XSLX from './../../src';

describe('node-xlsx import', () => {
  it('should get current object', () => {
    expect(typeof XSLX).toBe('object');
  });
  it('should has current keys', () => {
    expect(Object.keys(XSLX)).toEqual(['parse', 'build']);
  });
});
