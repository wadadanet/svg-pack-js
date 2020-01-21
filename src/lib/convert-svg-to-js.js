
const SVGO = require('svgo/lib/svgo')
const { promisify } = require('util');
const fs = require('fs')

module.exports = async (filepath, svgo_config = {}) => {
    const svgo = new SVGO(svgo_config)

    const data = await promisify(fs.readFile)(filepath, 'utf-8');
    const result = await svgo.optimize(data, {path: filepath})

    return result.data;
}