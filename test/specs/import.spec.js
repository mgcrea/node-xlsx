import expect from 'expect';
import XSLX from './../../src';

describe('node-xlsx import', () => {
  it('should get current object', () => {
    expect(XSLX).toBeA(Object);
  });
  it('should has current keys', () => {
    expect(XSLX).toIncludeKeys(['build', 'parse']);
  });
});
