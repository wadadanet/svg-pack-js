#!/usr/bin/env node
const program = require("commander")
const svgPackJs = require('../src/index');
const { version } = require("../package.json")

let svg_path, output_path
program
    .version(version)
    .option('-s, --svg <n>', 'SVG PATH')
    .option('-o, --output <n>', 'OUTPUT JS PATH')
    .parse(process.argv);
if (program.svg) {
    svg_path = program.svg
}
if (program.output) {
    output_path = program.output
}

(async()=>{
    await svgPackJs({ svg_path, output_path });
    console.info("complete")
})()
