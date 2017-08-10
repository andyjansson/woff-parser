import zlib from 'zlib';

export default function decompress(buf, origLength) {
    if (buf.length === origLength)
        return Promise.resolve(buf);

    return new Promise((resolve, reject) => {
        zlib.inflate(buf, (err, contents) => {
            if (err)
                return reject(err);
            resolve(contents);
        });
    });
}
