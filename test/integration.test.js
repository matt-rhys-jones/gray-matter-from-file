import path from 'path';
import grayMatterFromFile from '../src/index';

describe('grayMatterFromFile()', () => {
    it('should throw an error if the filepath is not provided', async () => {
        let didThrow = false;
        let errorCode = null;

        try {
            await grayMatterFromFile();
        } catch (e) {
            didThrow = true;
            errorCode = e.code;
        }

        expect(didThrow).to.be.true;
        expect(errorCode).to.equal('ERR_INVALID_ARG_TYPE');
    });

    it('should throw an error if the filepath does not exist', async () => {
        let didThrow = false;
        let errorCode = null;

        try {
            await grayMatterFromFile('does-not-exist');
        } catch (e) {
            didThrow = true;
            errorCode = e.code;
        }

        expect(didThrow).to.be.true;
        expect(errorCode).to.equal('ENOENT');
    });

    it('should return gray matter if it exists at the top of the provided file', async () => {
        const filepath = path.resolve(__dirname, 'fixtures/withFrontMatter.md');
        const result = await grayMatterFromFile(filepath);
        const expected = {
            title: 'some title',
            other: 'something else'
        }

        expect(result).to.deep.equal(expected);
    });

    it('should return an empty object if front matter does not exist at the top of the provided file', async () => {
        const filepath = path.resolve(__dirname, 'fixtures/noFrontMatter.md');
        const result = await grayMatterFromFile(filepath);

        expect(result).to.deep.equal({});
    });

    it('should return an empty object if front matter is invalid', async () => {
        const filepath = path.resolve(__dirname, 'fixtures/invalidFrontMatter.md');
        const result = await grayMatterFromFile(filepath);

        expect(result).to.deep.equal({});
    });
});
