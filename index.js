var decompress = require('./lib/decompress.js');
var name = require('./lib/name');
var os2 = require('./lib/os2');

module.exports = function (data) {
	var signature = data.readUInt32BE(0);
	if (signature !== 0x774F4646) return Promise.reject();

	var woff = {
		flavor: (data.readUInt32BE(4) === 0x4F54544F ? 'CFF' : 'TrueType'),
		totalSfntSize: data.readUInt32BE(16),
		majorVersion: data.readUInt16BE(20),
		minorVersion: data.readUInt16BE(22)
	};
	
	var numTables = data.readUInt16BE(12);
	var dataTables = [];
	for (var i = 0; i < numTables; i++) {
		var tag = data.readInt32BE(44 + i * 20);
		var offset = data.readUInt32BE(48 + i * 20);
		var compLength = data.readUInt32BE(52 + i * 20);
		var origLength = data.readUInt32BE(56 + i * 20);
		var origChecksum = data.readUInt32BE(60 + i * 20);
		var buf = data.slice(offset, offset + compLength);
		
		switch (tag) {
			case 0x6E616D65:
				dataTables.push(decompress(buf, origLength).then(function (contents) {
					woff['name'] = name(contents);
				}));
				break;
			case 0x4F532F32:
				dataTables.push(decompress(buf, origLength).then(function (contents) {
					woff['OS/2'] = os2(contents);
				}));
				break;
		}
	}

	return Promise.all(dataTables).then(function() {
		return Promise.resolve(woff);
	});
};