const ConvertSvgToJs = require('../../src/lib/convert-svg-to-js')
const path = require('path')

describe('converts', ()=>{
    it('convart svg to js file', async () =>{
        filepath = path.resolve(__dirname, '../svg/square.svg')
        const res = await ConvertSvgToJs(filepath)
        expect(res).toBe(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200"><path fill="#0ff" d="M160.5 34.5h141v141h-141z"/><path d="M301 35v140H161V35h140m1-1H160v142h142V34z"/></svg>`)
    })
});