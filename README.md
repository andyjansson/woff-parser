# woff-parser [![Build Status][ci-img]][ci]

WOFF font parser

[ci-img]:  https://travis-ci.org/andyjansson/woff-parser.svg
[ci]:      https://travis-ci.org/andyjansson/woff-parser

## Installation

```js
npm install woff-parser
```

## Usage 

```js
var fs = require('fs');
var parser = require('woff-parser');

fs.readFile('font.woff', function (err, contents) {
	if (err) throw err;
	parser(contents).then(function (result) {
		console.log(result);
	});
});
```

Outputs:

```json
{
	...
	"name": {
		"format": 0,
		"nameRecords": {
			"English": {
				"copyright": "Copyright 2010, 2012 Adobe Systems Incorporated. All Rights Reserved.",
				"fontFamily": "SourceSansPro-Regular",
				"fontSubFamily": "Regular",
				"uniqueFontId": "1.050;ADBE;SourceSansPro-Regular;ADOBE",
				"fullName": "SourceSansPro-Regular",
				"version": "Version 1.050;PS 1.000;hotconv 1.0.70;makeotf.lib2.5.5900",
				"postscriptName": "SourceSansPro-Regular",
				"trademark": "Source is a trademark of Adobe Systems Incorporated in the United States and/or other countries.",
				"manufacturer": "Adobe Systems Incorporated",
				"designer": "Paul D. Hunt",
				"vendorUrl": "http://www.adobe.com/type",
				"licenseUrl": "http://www.adobe.com/type/legal.html"
			}
		}
	}
	...
}
```