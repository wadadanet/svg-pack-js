#!/usr/bin/env node
const program = require("commander")
const svgPackJs = require('../src/index');
const { version } = require("../package.json")

let svg_path, output_path, mutation_observer
program
    .version(version)
    .option('-s, --svg <n>', 'SVG PATH')
    .option('-o, --output <n>', 'OUTPUT JS PATH')
    .option('-m, --mutation')
    .parse(process.argv);
if (program.svg) {
    svg_path = program.svg
}
if (program.output) {
    output_path = program.output
}
if (program.mutation) {
    mutation_observer = true;
}
(async()=>{
    await svgPackJs({ svg_path, output_path, mutation_observer });
})()
