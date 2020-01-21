const loadFiles = require('../../src/lib/load-files')
const path = require('path')

describe('loads', () => {
    it('svg filse', async () => {
        const expect_value = [
            path.resolve(__dirname + '/../svg/square.svg').replace(/\\/g, '/'),
            path.resolve(__dirname + '/../svg/svg-pack.svg').replace(/\\/g, '/')
        ]
        const files = await loadFiles({
            pattern: path.resolve(__dirname + '/../svg/*.svg'),
        })
        expect(files).toStrictEqual(expect_value)
        return
    })
});