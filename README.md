## SVG Pack JS

Convert SVG files to one JS file

## Example

- [Font Awesome(free) SVG Pack JS](https://github.com/wadadanet/svg-pack/tree/master/example/fontawesome)

## Quick start

### 1. install

```bash
npm install svg-pack-js --save-dev
```

### 2. Make svg-pack.js

``` js
// make-svg-pack.js
const svgPack = require('svg-pack-js');
svgPack({
    svg_path: 'src/assets/svg/*.svg',
    output_path: 'src/svg-pack.js',
})
```

```bash
node make-svg-pack.js
```

### 3. Use

``` html
<head>
  <script src="./svg-pack.js" async>
</head>
<body>
  <div class="svgp svgp-home"></div>
</body>
```

## Concept
- Supports landscape and portrait images
- Asynchronous loading
- Reduce requests

## Features

### Change Color

```css
.svgp-home path {
  fill: #FF0000;
}
```

## License

GPL-3.0-or-later

## Keywords
