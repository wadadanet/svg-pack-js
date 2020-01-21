## SVG-Pack

Convert SVG files to one JS file

## Why?

一つのJSファイルで複数のSVGファイルをロードできたら最高だから

## Quick start

### 1. install

```bash
npm install svg-pack --save-dev
```

### 2. Make svg-pack.js
``` js
const svgPack = require('svg-pack');
svgPack({
    svg_path: 'src/assets/svg/*.svg',
    output_path: 'src/svg-pack.js',
})
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
