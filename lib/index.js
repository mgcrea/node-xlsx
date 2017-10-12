'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.build = build;

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _helpers = require('./helpers');

var _workbook = require('./workbook');

var _workbook2 = _interopRequireDefault(_workbook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(mixed) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var workSheet = _xlsx2.default[(0, _helpers.isString)(mixed) ? 'readFile' : 'read'](mixed, options);
  return Object.keys(workSheet.Sheets).map(function (name) {
    var sheet = workSheet.Sheets[name];
    return { name: name, data: _xlsx2.default.utils.sheet_to_json(sheet, { header: 1, raw: true }) };
  });
}

function build(worksheets) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaults = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  };
  var workBook = new _workbook2.default();
  worksheets.forEach(function (worksheet) {
    var name = worksheet.name || 'Sheet';
    var data = (0, _helpers.buildSheetFromMatrix)(worksheet.data || [], worksheet.options ? worksheet.options : worksheets.length === 1 ? options || {} : {}); // If worksheet has options, use this one ; if there's only one worksheet, use global options (for retro-compatibility)
    workBook.SheetNames.push(name);
    workBook.Sheets[name] = data;
  });
  delete options['!merges']; // Override merge in global options for the options by worksheet to work
  var excelData = _xlsx2.default.write(workBook, Object.assign({}, defaults, options));
  return excelData instanceof Buffer ? excelData : new Buffer(excelData, 'binary');
}

exports.default = { parse: parse, build: build };
//# sourceMappingURL=index.js.map