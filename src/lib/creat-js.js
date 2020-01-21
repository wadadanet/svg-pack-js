const path = require('path')
const { readFile } = require('fs')
const { transform } = require('@babel/core')
const { promisify } = require('util');

module.exports = async (file_path, svgs_str, babel_option = { minified: true })=>{
    let js_code = await promisify(readFile)(file_path, 'utf-8')
        .catch(error => {
            // console.error('file not found')
            throw new Error('file not found')
        });
    js_code = js_code.replace('// SVG_PACK::INSERT_SVGS', svgs_str)
    return await new Promise((resolve, reject) => {
        transform(js_code, babel_option, (error, result) => {
            if (error) {
                reject(error)
            }
            else resolve(result.code)
        })
    });
}