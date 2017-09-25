import cmap from './cmap';
import decompress from './decompress';
import name from './name';
import os2 from './os2'

const TAG_NAME  = 0x6E616D65;
const TAG_OS2   = 0x4F532F32;
const TAG_CMAP  = 0x636D6170;

export default function parseDataTables(data) {
    const numberOfTables = data.readUInt16BE(12);
    const promises = [];

    for (let i = 0; i < numberOfTables; i++) {
        const tag = data.readInt32BE(44 + i * 20);
        const offset = data.readUInt32BE(48 + i * 20);
        const compLength = data.readUInt32BE(52 + i * 20);
        const origLength = data.readUInt32BE(56 + i * 20);
        // const origChecksum = data.readUInt32BE(60 + i * 20);
        const buf = data.slice(offset, offset + compLength);

        switch (tag) {
            case TAG_NAME: {
                promises.push(
                    decompress(buf, origLength).then(contents => ({
                        name: name(contents)
                    }))
                );
                break;
            }
            case TAG_OS2: {
                promises.push(
                    decompress(buf, origLength).then(contents => ({
                        'OS/2': os2(contents)
                    }))
                );
                break;
            }
            case TAG_CMAP: {
                promises.push(
                    decompress(buf, origLength).then(contents => ({
                        cmap: cmap(contents)
                    }))
                );
            }
        }
    }

    return Promise.all(promises).then(values => {
        return values.reduce((obj, curr) => Object.assign(obj, curr), {});
    });
}
