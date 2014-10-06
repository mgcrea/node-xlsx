'use strict';

var XLSX = require('xlsx');
var _ = {defaults: require('lodash.defaults'), map: require('lodash.map')};

function datenum(v, date1904) {
  if(date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0}};
  for(var R = 0; R !== data.length; ++R) {
    for(var C = 0; C !== data[R].length; ++C) {
      if(range.s.r > R) range.s.r = R;
      if(range.s.c > C) range.s.c = C;
      if(range.e.r < R) range.e.r = R;
      if(range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C] };
      if(cell.v === null) continue;
      var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

      if(typeof cell.v === 'number') cell.t = 'n';
      else if(typeof cell.v === 'boolean') cell.t = 'b';
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

module.exports = {
  parse: function(mixed, options) {
    var ws;
    if(typeof mixed === 'string') ws = XLSX.readFile(mixed, options);
    else ws = XLSX.read(mixed, options);
    return _.map(ws.Sheets, function(sheet, name) {
      return {name: name, data: XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})};
    });
  },
  build: function(array, options) {
    var defaults = {
      bookType:'xlsx',
      bookSST: false,
      type:'binary'
    };
    var wb = new Workbook();
    array.forEach(function(worksheet) {
      var name = worksheet.name || 'Sheet';
      var data = sheet_from_array_of_arrays(worksheet.data || []);
      wb.SheetNames.push(name);
      wb.Sheets[name] = data;
    });
    var data = XLSX.write(wb, _.defaults(options || {}, defaults));
    if(!data) return false;
    var buffer = new Buffer(data, 'binary');
    return buffer;
  }
};
