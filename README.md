# Node XLSX

[![npm version](https://img.shields.io/npm/v/node-xlsx.svg?style=flat)](https://www.npmjs.com/package/node-xlsx) [![license](https://img.shields.io/github/license/mgcrea/node-xlsx.svg?style=flat)](https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)) [![build status](http://img.shields.io/travis/mgcrea/node-xlsx/master.svg?style=flat)](http://travis-ci.org/mgcrea/node-xlsx) [![dependencies status](https://img.shields.io/david/mgcrea/node-xlsx.svg?style=flat)](https://david-dm.org/mgcrea/node-xlsx) [![devDependencies status](https://img.shields.io/david/dev/mgcrea/node-xlsx.svg?style=flat)](https://david-dm.org/mgcrea/node-xlsx#info=devDependencies) [![coverage status](http://img.shields.io/codeclimate/coverage/github/mgcrea/node-xlsx.svg?style=flat)](https://codeclimate.com/github/mgcrea/node-xlsx) [![climate status](https://img.shields.io/codeclimate/github/mgcrea/node-xlsx.svg?style=flat)](https://codeclimate.com/github/mgcrea/node-xlsx)

Excel file parser/builder that relies on [js-xlsx](https://github.com/SheetJS/js-xlsx).



## Usage

### Examples

1. Parsing a xlsx from file/buffer, outputs an array of worksheets

```js
import xlsx from 'node-xlsx';

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
```

1. Building a xlsx

```js
import xlsx from 'node-xlsx';

const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
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
