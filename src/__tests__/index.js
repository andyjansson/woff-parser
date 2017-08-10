import fs from 'fs';
import path from 'path';

import test from 'ava';

import woff from '../';

import expected from './expected';

test.cb(
    'parse .woff fonts',
    t => {
        fs.readFile(path.join(__dirname, 'pathFont.woff'), function (err, contents) {
            if (err) throw err;
            
            woff(contents).then(results => {
                t.deepEqual(results, expected);
                t.end();
            }).catch(() => {
                t.fail();
                t.end();
             })
        });        
    }
);
