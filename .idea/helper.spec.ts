import expect from 'expect';
import {buildSheetFromMatrix} from '../../src/helpers';

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
      expect(typeof buildSheetFromMatrix(notArrayData)).toBe('object');
    });

    describe('with primitive data objects', () => {
      it('should display data in percentage format with 2-decimal precision', () => {
        const primitive = [[{t: 'n', z: 10, f: '=AVERAGE(2:2)'}]];

        const sheet = buildSheetFromMatrix(primitive);
        expect(sheet.A1.t).toBe('n');
        expect(sheet.A1.f).toBe('=AVERAGE(2:2)');
        expect(sheet.A1.z).toBe('0.00%');
      });

      it('should display data in percentage format with 2-decimal precision bis', () => {
        const primitive = [[{t: 'n', z: 4, f: '=SUM(2:2)'}]];

        const sheet = buildSheetFromMatrix(primitive);
        expect(sheet.A1.t).toBe('n');
        expect(sheet.A1.f).toBe('=SUM(2:2)');
        expect(sheet.A1.z).toBe('#,##0.00');
      });
    });
  });
});
