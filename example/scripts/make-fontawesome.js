const svgPack = require('../../index.js');
svgPack({
    svg_path: __dirname + '/../fontawesome/svg/*.svg',
    output_path: __dirname + '/../fontawesome/svg-pack.js',
})

