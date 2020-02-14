const path = require('path')
const { readFile } = require('fs')
const { transform } = require('@babel/core')
const { promisify } = require('util');

module.exports = async (file_path, svgs_str, babel_option = { minified: true }, mutation_observer = false)=>{
    let js_code = await promisify(readFile)(file_path, 'utf-8')
        .catch(error => {
            console.log(file_path)
            throw new Error('file not found')
        });
    js_code = js_code.replace('// SVG_PACK::INSERT_SVGS', svgs_str)
    if (mutation_observer){
        js_code = js_code.replace('// SVG_PACK::MUTATION_OBSERVER', "window.SvgPack.mutationObserverStart();")
    }
    return await new Promise((resolve, reject) => {
        transform(js_code, babel_option, (error, result) => {
            if (error) {
                reject(error)
            }
            else resolve(result.code)
        })
    });
}