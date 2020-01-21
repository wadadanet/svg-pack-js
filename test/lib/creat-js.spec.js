const creatJs = require('../../src/lib/creat-js')
const path = require('path')

describe('svg-pack', ()=>{
    it('creat js code', async () =>{
        const js_code = await creatJs(
            path.resolve(__dirname + '/../data/front-end/succsess-svg-pack.js'),
            `const svgs = {hoge: 'hoge'}`
        )
        expect(js_code).toBe(`const svgs={hoge:"hoge"};const test="test string";`)
    })
    it('babel error', async () => {
        let error_flg = false;
        await creatJs(
            path.resolve(__dirname + '/../data/front-end/ng-svg-pack.js'),
            `const svgs = {hoge: 'hoge'}`
        ).catch(error => {
            // console.log(error);
            error_flg = true;
        })
        expect(error_flg).toBe(true)
    })
});