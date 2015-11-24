'use strict';
// nodemon -w . --exec npm test

var util = require('util'),
    fs = require('fs');

var log = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return util.log(util.inspect.call(null, args.length === 1 ? args[0] : args, false, null, true));
};

var xlsx = require('../lib/node-xlsx');

module.exports.build = function(assert) {

  var fixture = JSON.parse(fs.readFileSync(__dirname + '/fixtures/test.json'));

  fixture[0].data.push([
    {t : 'n', z : xlsx.XLSX.SSF._table[4], v : 1234567 },
    {t : 'n', z : xlsx.XLSX.SSF._table[38], v : -1234567 },
    {t : 'v', v : xlsx.XLSX.SSF.format('$#,##0.00', 1234567) }
  ]);

  var filename = __dirname + '/fixtures/test.xlsx';
  var xlsData;

  // build file
  xlsData = xlsx.build(fixture);
  assert.equal(xlsData instanceof Buffer, true);
  assert.equal(xlsData.toString('base64').substr(0, 12), fs.readFileSync(filename).toString('base64').substr(0, 12));
  // fs.writeFileSync('/tmp/foo.xlsx', xlsData);
  assert.done();

};
