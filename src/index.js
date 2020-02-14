
const loadFiles = require('./lib/load-files')
const convertSvgToJs = require('./lib/convert-svg-to-js')
const creatJs = require('./lib/creat-js')
const { basename } = require('path')
const { promisify } = require('util')
const { writeFile } = require('fs')
const { resolve } = require('path')
const program = require("commander")
const { version } = require("../package.json")

module.exports = async ({
        svg_path,
        output_path,
        template_js_path,
        babel_option = { minified: true }
    }) => {
    console.log(`svg-pack-js varsion:${version}`)
    console.log(process.argv)
    program
        .version(version)
        .option('-s, --svg', 'Add peppers')
        .option('-o, --output', 'Add pineapple')
        .parse(process.argv);
    if (program.svg) {
        svg_path = program.svg
    }
    if (program.output) {
        output_path = program.output
    }

    if(!template_js_path) {
        template_js_path = resolve(__dirname + '/front-end/svg-pack.js')
    }
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

    return
}