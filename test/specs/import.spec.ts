import XSLX from '../../src';
import {describe, it, expect} from '@jest/globals';

describe('node-xlsx import', () => {
  it('should get current object', () => {
    expect(typeof XSLX).toBe('object');
  });
  it('should has current keys', () => {
    expect(Object.keys(XSLX)).toEqual(['parse', 'parseMetadata', 'build']);
  });
});
