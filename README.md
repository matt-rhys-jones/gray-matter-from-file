# Gray Matter From File

[![Build Status](https://travis-ci.org/matt-rhys-jones/gray-matter-from-file.svg?branch=master)](https://travis-ci.org/matt-rhys-jones/gray-matter-from-file)

Reads the front matter portion of a markdown file (denoted by `---` above and below the front matter contents) and passes this to [Gray Matter](https://www.npmjs.com/package/gray-matter) for parsing.

This *only* reads the front matter of a file and does not load the remaining contents into memory, this results in fast and asynchronous parsing.

## Usage
A Markdown file with some front matter and contents underneath.

```markdown
---
hello: world
---

The remaining contents of this markdown file would be ignored, this module simply retrieves the front matter above.
```

Use grayMatterFromFile to obtain this front matter, and parse it via the gray-matter module.

```javascript
const path = require('path');
const grayMatterFromFile = require('gray-matter-from-file').default;
// import grayMatterFromFile from 'gray-matter-from-file';

const filepath = path.resolve(__dirname, 'my-file.md');

grayMatterFromFile(filepath)
    .then(grayMatter => console.log(grayMatter)) // { hello: 'world' }
    .catch(error => console.log(error))
```

## Why Use It

This module uses `fs.readFile` and `readline` to stream the front matter from a markdown file line by line, before passing the result to [Gray Matter](https://www.npmjs.com/package/gray-matter) and returning the parsed object.

This ensures that:

- There are no synchronous file reads to obtain the front matter
- Only the front matter is ever read into memory, the rest of the file is ignored
- This should be performant for a large number of front matter reads across many files, perhaps useful for indexing or processing a large set of markdown files in a static site generator

## Support

This has only been transpiled for Node 8 (and above) in order to help enourage the community to be on the latest, more secure and more performant versions of Node. I may remove support for Node 8 when it is no longer LTS.
