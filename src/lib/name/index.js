import iconv from 'iconv-lite';

import names from './names';
import mac from './macintosh';
import win from './windows';

const UNICODE_PLATFORM  = 0;
const MAC_PLATFORM      = 1;
const WINDOWS_PLATFORM  = 3;

export default function name(data) {
	const format = data.readUInt16BE(0);
	const count = data.readUInt16BE(2);
	const stringOffset = data.readUInt16BE(4);
	const storage = data.slice(stringOffset);
	
	const nameRecords = {};
	for (let i = 0; i < count; i++) {
		const platformId = data.readUInt16BE(6 + (12 * i));
		const encodingId = data.readUInt16BE(8 + (12 * i));
		const languageId = data.readUInt16BE(10 + (12 * i));
		const nameId = data.readUInt16BE(12 + (12 * i));
		const length = data.readUInt16BE(14 + (12 * i));
		const offset = data.readUInt16BE(16 + (12 * i));	
	
		const nameData = storage.slice(offset, offset + length);
        const key = names[nameId] || nameId;
        
        let lang;
        let decodedData;

		switch (platformId) {
			case UNICODE_PLATFORM: {
                lang = 0;
				decodedData = iconv.decode(nameData, 'utf-16be');
                break;
            }
			case MAC_PLATFORM: {
				lang = mac.language(languageId);
				decodedData = iconv.decode(nameData, mac.encoding(encodingId));
                break;
            }
            case WINDOWS_PLATFORM: {
				lang = win.language(languageId);
				decodedData = iconv.decode(nameData, win.encoding(encodingId));
                break;
            }
		}
		if (nameRecords[lang] === undefined) {
			nameRecords[lang] = {};
		}
		nameRecords[lang][key] = decodedData;
    }
    
	const name = {
        format: format,
        nameRecords: nameRecords
	};
	
	if (name.format > 0) {
        const offset = count * 12;
		const langTagCount = data.readUInt16BE(6 + offset);
		const langTagRecords = [];
		for (let i = 0; i < langTagCount; i++) {
			const length = data.readUInt16BE(8 + offset + (4 * i));
			const offset = data.readUInt16BE(10 + offset + (4 * i));
			langTagRecords.push(
				iconv.decode(storage.slice(offset, offset + length), 'utf-16be')
			);
		}
		name["langTagRecords"] = langTagRecords;
	}
	return name;
}
