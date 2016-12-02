import expect from 'expect';
import {buildSheetFromMatrix} from './../../src/helpers';

describe('node-xlsx helper', () => {
  describe('buildSheetFromMatrix', () => {
    it('should throw if row data is not array', () => {
      const notArrayData = [['a1'], {val: 'b1'}];
      expect(() => buildSheetFromMatrix(notArrayData)).toThrow();
    });

    it('should throw if sheet data is not array', () => {
      const notArrayData = {val: 'a1'};
      expect(() => buildSheetFromMatrix(notArrayData)).toThrow();
    });

    it('should not throw if data is valid array', () => {
      const notArrayData = [['a1'], ['b1']];
      expect(() => buildSheetFromMatrix(notArrayData)).toNotThrow();
    });

  });
});
