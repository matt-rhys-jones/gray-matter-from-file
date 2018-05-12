# Gray Matter From File

Reads the front matter portion of a markdown file (denoted by `---` above and below the front matter contents) and passes this to [Gray Matter](https://www.npmjs.com/package/gray-matter) for parsing.

This *only* reads the front matter of a file and does not load the remaining contents into memory, this results in fast and asynchronous parsing.

## Use Case

With this small library you can parse the front matter of a markdown file on disk without having to load the entire file into memory (wasteful when you only need the first few lines), or writing your own asynchronous implementation.

## Usage
A Markdown file with some front matter and contents underneath.

```markdown
---
hello: world
---

The remaining contents of this markdown file would be ignored, this module simply retrieves the front matter above.
```

Use Gray Matter From File to obtain this front matter, and parse it via Gray Matter

```javascript
const path = require('path');
const grayMatterFromFile = require('gray-matter-from-file').default;
// import grayMatterFromFile from 'gray-matter-from-file';

const filepath = path.resolve(__dirname, 'my-file.md');

grayMatterFromFile(filepath)
    .then(grayMatter => console.log(grayMatter)) // { hello: 'world' }
    .catch(error => console.log(error))
```
