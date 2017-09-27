export default function cmap(data) {
    let characterCodeToGlyphIndexMap = {}
    const numEncodingTables = data.readUInt16BE(2);

    const tableOffsets = [];
    for (let i = 0; i < numEncodingTables; i++) {
        tableOffsets.push(data.readUInt32BE((i * 8) + 8));
    }

    tableOffsets.forEach(offset => {
        const tableFormat = data.readUInt16BE(offset);

        switch (tableFormat) {
            case 0:
                characterCodeToGlyphIndexMap = Object.assign(characterCodeToGlyphIndexMap, decodeFormat0CmapTable(data, offset));
                break;
            case 4:
                characterCodeToGlyphIndexMap = Object.assign(characterCodeToGlyphIndexMap, decodeFormat4CmapTable(data, offset));
                break;
            case 6:
                characterCodeToGlyphIndexMap = Object.assign(characterCodeToGlyphIndexMap, decodeFormat6CmapTable(data, offset));
                break;
            default:
                throw new Error('Unrecognized/unimplemented cmap format table');
        }
    });

    return characterCodeToGlyphIndexMap;
}

function decodeFormat0CmapTable(data, offset) {
    const length = data.readUInt16BE(offset + 2);
    const subtable = data.slice(offset, offset + length);
    const characterCodeToGlyphIndexMap = {};

    for (let i = 0; i < 256; i++) {
        const glyphId = subtable.readUInt8(i + 6);
        if (glyphId != 0) {
            characterCodeToGlyphIndexMap[i] = glyphId;
        }
    }

    return characterCodeToGlyphIndexMap;
}

function decodeFormat4CmapTable(data, offset) {
    const length = data.readUInt16BE(offset + 2);
    const subtable = data.slice(offset, offset + length);
    const characterCodeToGlyphIndexMap = {};
    const characterRanges = [];

    const segCountX2 = subtable.readUInt16BE(6);

    for (let i = 0; i < segCountX2; i += 2) {
        characterRanges.push({
            startCount: subtable.readUInt16BE(16 + segCountX2 + i),
            endCount: subtable.readUInt16BE(14 + i),
            idDelta: subtable.readInt16BE(16 + (2 * segCountX2) + i),
            idRangeOffset: subtable.readInt16BE(16 + (3 * segCountX2) + i),
            idRangeOffsetAddress: 16 + (3 * segCountX2) + i,
        })
    }

    characterRanges.forEach(range => {
        const { startCount, endCount, idDelta, idRangeOffset, idRangeOffsetAddress } = range;
        if (startCount != 0xFFFF && endCount != 0xFFFF) {
            for (let charCode = startCount; charCode <= endCount; charCode++) {
                characterCodeToGlyphIndexMap[charCode] =
                    idRangeOffset === 0 ?
                        (charCode + idDelta) & 0xFFFF :
                        subtable.readUInt16BE(idRangeOffsetAddress + (charCode - startCount) + (idRangeOffset / 2));
            }
        }
    });

    return characterCodeToGlyphIndexMap;
}

function decodeFormat6CmapTable(data, offset) {
    const length = data.readUInt16BE(offset + 2);
    const subtable = data.slice(offset, offset + length);
    const characterCodeToGlyphIndexMap = {};

    const firstCode = subtable.readUInt16BE(6);
    const entryCount = subtable.readUInt16BE(8);

    for (let i = 0; i < entryCount; i++) {
        const glyphId = subtable.readUInt16BE(10 + (2 * i));
        if (glyphId != 0) {
            characterCodeToGlyphIndexMap[firstCode + i] = glyphId;
        }
    }

    return characterCodeToGlyphIndexMap;
}