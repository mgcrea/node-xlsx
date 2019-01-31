# Node XLSX

[![npm version](https://img.shields.io/npm/v/node-xlsx.svg?style=flat)](https://www.npmjs.com/package/node-xlsx)
[![license](https://img.shields.io/badge/license-Apache--2.0-green.svg)](https://tldrlegal.com/license/apache-license-2.0-(apache-2.0))
![status](https://img.shields.io/badge/status-maintained-brightgreen.svg)
[![npm downloads](https://img.shields.io/npm/dm/node-xlsx.svg)](https://www.npmjs.com/package/node-xlsx)<br />
[![build status](http://img.shields.io/travis/mgcrea/node-xlsx/master.svg?style=flat)](http://travis-ci.org/mgcrea/node-xlsx)
[![dependencies status](https://img.shields.io/david/mgcrea/node-xlsx.svg?style=flat)](https://david-dm.org/mgcrea/node-xlsx)
[![devDependencies status](https://img.shields.io/david/dev/mgcrea/node-xlsx.svg?style=flat)](https://david-dm.org/mgcrea/node-xlsx#info=devDependencies)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5bbea5e7b2084c2586e5599cda6aefc8)](https://www.codacy.com/app/mgcrea/node-xlsx?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mgcrea/node-xlsx&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/5bbea5e7b2084c2586e5599cda6aefc8)](https://www.codacy.com/app/mgcrea/node-xlsx?utm_source=github.com&utm_medium=referral&utm_content=mgcrea/node-xlsx&utm_campaign=Badge_Coverage)


Excel file parser/builder that relies on [js-xlsx](https://github.com/SheetJS/js-xlsx).


## Usage
### Installation
```npm install node-xlsx --save```
### Examples

1. Parsing a xlsx from file/buffer, outputs an array of worksheets

```js
import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
```

2. Building a xlsx

```js
import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
```

  * Custom column width
```js
import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']]
const option = {'!cols': [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 } ]};

var buffer = xlsx.build([{name: "mySheetName", data: data}], option); // Returns a buffer
```

  * Spanning multiple rows `A1:A4` in every sheets
```js
import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
const option = {'!merges': [ range ]};

var buffer = xlsx.build([{name: "mySheetName", data: data}], option); // Returns a buffer
```

  * Spanning multiple rows `A1:A4` in second sheet only
```js
import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

const dataSheet1 = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
const dataSheet2 = [[4, 5, 6], [7, 8, 9, 10], [11, 12, 13, 14], ['baz', null, 'qux']];
const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
const option = {'!merges': [ range ]};

var buffer = xlsx.build([{name: "myFirstSheet", data: dataSheet1}, {name: "mySecondSheet", data: dataSheet2, options: options}]); // Returns a buffer
```
_Beware that if you try to merge several times the same cell, your xlsx file will be seen as corrupted._


### Troubleshooting

This library requires at lease nodeJS v4. For legacy versions, you can use this workaround before using the lib.

```
npm i --save object-assign
Object.prototype.assign = require('object-assign');
```


### Contributing

Please submit all pull requests the against master branch. If your unit test contains javascript patches or features, you should include relevant unit tests. Thanks!


### Available scripts

| **Script** | **Description** |
|----------|-------|
| start | Alias of test:watch |
| test | Run mocha unit tests |
| test:watch | Run and watch mocha unit tests |
| lint | Run eslint static tests |
| compile | Compile the library |
| compile:watch | Compile and watch the library |


## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea


## Copyright and license

[Apache License 2.0](https://spdx.org/licenses/Apache-2.0.html)

```
Copyright (C) 2012-2014  Olivier Louvignes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

Except where noted, this license applies to any and all software programs and associated documentation files created by the Original Author and distributed with the Software:

Inspired by SheetJS gist examples, Copyright (c) SheetJS.
```
