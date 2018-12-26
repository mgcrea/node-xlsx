'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCellDescriptor = exports.isObject = exports.isString = exports.isNumber = exports.isBoolean = exports.buildSheetFromMatrix = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBoolean = function isBoolean(maybeBoolean) {
  return typeof maybeBoolean === 'boolean';
};
var isNumber = function isNumber(maybeNumber) {
  return typeof maybeNumber === 'number';
};
var isString = function isString(maybeString) {
  return typeof maybeString === 'string';
};
var isObject = function isObject(maybeObject) {
  return maybeObject !== null && (typeof maybeObject === 'undefined' ? 'undefined' : _typeof(maybeObject)) === 'object';
};
var isCellDescriptor = function isCellDescriptor(maybeCell) {
  return isObject(maybeCell) && 'v' in maybeCell;
};

var originDate = new Date(Date.UTC(1899, 11, 30));

var buildExcelDate = function buildExcelDate(value, is1904) {
  var epoch = Date.parse(value + (is1904 ? 1462 : 0));
  return (epoch - originDate) / 864e5;
};

var buildSheetFromMatrix = function buildSheetFromMatrix(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var workSheet = {};
  var range = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };

  if (!Array.isArray(data)) throw new Error('sheet data is not array');

  for (var R = 0; R !== data.length; R += 1) {
    for (var C = 0; C !== data[R].length; C += 1) {
      if (!Array.isArray(data[R])) throw new Error(R + 'th row data is not array');

      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      if (data[R][C] === null) {
        continue; // eslint-disable-line
      }
      var cell = isCellDescriptor(data[R][C]) ? data[R][C] : { v: data[R][C] };
      var cellRef = _xlsx2.default.utils.encode_cell({ c: C, r: R });
      if (isNumber(cell.v)) {
        cell.t = 'n';
      } else if (isBoolean(cell.v)) {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.v = buildExcelDate(cell.v);
        cell.z = cell.z || _xlsx2.default.SSF._table[14]; // eslint-disable-line no-underscore-dangle
      } else {
        cell.t = 's';
      }
      if (isNumber(cell.z)) cell.z = _xlsx2.default.SSF._table[cell.z]; // eslint-disable-line no-underscore-dangle
      workSheet[cellRef] = cell;
    }
  }
  if (range.s.c < 1e7) {
    workSheet['!ref'] = _xlsx2.default.utils.encode_range(range);
  }
  if (options['!cols']) {
    workSheet['!cols'] = options['!cols'];
  }
  if (options['!merges']) {
    workSheet['!merges'] = options['!merges'];
  }
  // Support for setting up a single cell
  for (var key in options) {
    if (/^[A-Z]+\d+$/.test(key)) {
      workSheet[key] ? workSheet[key] = Object.assign(workSheet[key], options[key]) : workSheet[key] = options[key];
    }
  }
  return workSheet;
};

exports.buildSheetFromMatrix = buildSheetFromMatrix;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isObject = isObject;
exports.isCellDescriptor = isCellDescriptor;
//# sourceMappingURL=helpers.js.map