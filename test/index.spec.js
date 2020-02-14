const SvgPack = require('../src/index')
const { resolve } = require('path')
const { readFile, unlinkSync } = require('fs')
const { promisify } = require('util');


describe('svg-pack-js', () => {
    it('file converts', async () => {
        const output_path = resolve(__dirname + '/tmp/svg-pack.js')
        await SvgPack({
            svg_path: resolve(__dirname + '/svg/*.svg'),
            template_js_path: resolve(__dirname + '/data/front-end/succsess-svg-pack.js'),
            output_path 
        })

        const js_code = await promisify(readFile)(output_path, 'utf-8')
        const expect_value = await promisify(readFile)(resolve(__dirname + '/data/front-end/svgpack.js'), 'utf-8')
        expect(js_code).toBe(expect_value)
        unlinkSync(output_path)
    })
    it("svg file not found", async ()=>{
        const output_path = resolve(__dirname + '/tmp/svg-pack.js')
        let has_error = false
        await SvgPack({
            svg_path: resolve(__dirname + '/no_svg/*.svg'),
            template_js_path: resolve(__dirname + '/data/front-end/succsess-svg-pack.js'),
            output_path
            })
            .catch(error => {
                has_error = true
            })
        expect(has_error).toBe(true)
    })
});