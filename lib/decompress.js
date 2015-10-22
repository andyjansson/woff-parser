var zlib = require('zlib');

module.exports = function (buf, origLength, cb) {
	return new Promise(function (resolve, reject) {
		if (buf.length == origLength) return resolve(buf);
		zlib.inflate(buf, function (err, contents) {
			if (err) return reject();
			resolve(contents);
		});
	});
}