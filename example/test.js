const path = require('path');
const grayMatterFromFile = require('gray-matter-from-file');

const filepath = path.resolve(__dirname, 'my-file.md');

grayMatterFromFile(filepath)
    .then(grayMatter => console.log(grayMatter)) // { hello: 'world' }
    .catch(error => console.log(error))
