
const loadFiles = require('./lib/load-files')
const convertSvgToJs = require('./lib/convert-svg-to-js')
const creatJs = require('./lib/creat-js')
const { basename } = require('path')
const { promisify } = require('util');
const { writeFile } = require('fs')
const { resolve } = require('path')

module.exports = async ({
        svgfile_path,
        template_js_path,
        output_path,
        babel_option = { minified: true }
    }) => {
    if(!template_js_path) {
        template_js_path = resolve(__dirname + '/front-end/succsess-svg-pack.js')
    }
    const files = await loadFiles({
        pattern: svgfile_path
    })
    if (!files || files.length === 0) {
        throw new Error('svg file not found')
    }
    let datas = {};
    for(let file of files) {
        const data = await convertSvgToJs(file)
        const name = basename(file, '.svg')
        datas[name] = data
    }
    const svgs_str = `const svgs = ${JSON.stringify(datas)};`

    const js_code = await creatJs(
        template_js_path,
        svgs_str,
        babel_option
    )

    await promisify(writeFile)(output_path, js_code)
        .catch (error => {
            throw new Error('file not found')
        });

    return
}