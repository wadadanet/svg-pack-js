
const loadFiles = require('./lib/load-files')
const convertSvgToJs = require('./lib/convert-svg-to-js')
const creatJs = require('./lib/creat-js')
const { basename } = require('path')
const { promisify } = require('util')
const { writeFile } = require('fs')
const { resolve } = require('path')
const { version } = require("../package.json")

module.exports = async ({
        svg_path,
        output_path,
        template_js_path = resolve(__dirname + '/front-end/svg-pack.js'),
        babel_option = { minified: true }
    }) => {
    console.info(`svg-pack-js varsion:${version}`)
    console.info(`svg path:${svg_path}`)
    
    const files = await loadFiles({
        pattern: svg_path
    })
    if (!files || files.length === 0) {
        console.log("svg_path", svg_path);
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
            throw new Error('write error')
        });
    
    return true
};