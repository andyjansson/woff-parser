import dataTables from './lib/datatables';

const WOFF_SIGNATURE = 0x774F4646;
const OTTO = 0x4F54544F;

export default function woffParser(data) {
    return new Promise((resolve, reject) => {
        const signature = data.readUInt32BE(0);
        
        if (signature !== WOFF_SIGNATURE) 
            return reject();

        const woff = {
			flavor: (data.readUInt32BE(4) === OTTO ? 'CFF' : 'TrueType'),
			totalSfntSize: data.readUInt32BE(16),
			majorVersion: data.readUInt16BE(20),
			minorVersion: data.readUInt16BE(22)
        };

        dataTables(data).then(results => {
            resolve(Object.assign(woff, results));
        });
    });
}
