import readline from 'readline';
import fs from 'fs';
import os from 'os';
import grayMatter from 'gray-matter';

const readFrontMatter = filepath => {
    return new Promise((resolve, reject) => {
        let frontMatter = '';
        let fileReader = fs.createReadStream(filepath);

        const lineReader = readline.createInterface({
            input: fileReader
        });

        lineReader.on('line', line => {
            // first line / last line / mid lines
            if (!frontMatter && line === '---') {
                frontMatter = frontMatter + line;
            } else if (frontMatter  && line === '---')   {
                frontMatter = frontMatter + os.EOL + line;
                lineReader.close();
            } else {
                frontMatter = frontMatter + os.EOL + line;
            }
        });

        lineReader.on('close', () => {
            resolve(frontMatter);
        });

        fileReader.on('error', error => {
            reject(error);
        });
    });
};

export default filepath => {
    return new Promise((resolve, reject) => {
        readFrontMatter(filepath)
            .then(frontMatter => {
                const parsedFrontMatter = grayMatter(frontMatter);
                resolve(parsedFrontMatter.data);
            })
            .catch(e => reject(e))
    });
};
