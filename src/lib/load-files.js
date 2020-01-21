
const glob = require("glob")

module.exports = async ({ pattern, option = {}}) => {
    // console.log(pattern);
    return await new Promise((resolve, reject) => {
        glob(pattern, option, (error, files) => {
            if (error) reject(error)
            else resolve(files)
        })
    });
}