var path = require('path');
var fs = require('fs');
var woff = require('../');
var assert = require('assert');
var expected = require('./expected.json');

describe('woff-parser', function () {
	it('can parse .woff fonts', function (done) {
		fs.readFile(path.join(__dirname, 'pathFont.woff'), function (err, contents) {
			if (err) throw err;
			woff(contents).then(function (results) {
				assert.deepEqual(results, expected);
				done();
			}, function () {
				assert.fail("Parsing font failed");
			});
		});
	});
});
