# Pattern Hexagon

ES6 d3.js svg hexagon pattern.

## Environment Variables

The following values can be set via environment or passed into the class.

| Name | Type | Description |
| :-- | :-- | :-- |
| `DIMENSION_UNIT` | integer | width/height of single pattern swatch |

## Install

```bash
# install package
npm install @lgv/pattern-hexagon
```

## HexagonPattern

### Use Module

```bash
import { HexagonPattern } from "@lgv/pattern-hexagon";

// initialize
const hp = new HexagonPattern();

// generate svg artboard
let tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
tag.setAttributeNS(null, "id", "artboard");
tag.setAttributeNS(null, "width", 100);
tag.setAttributeNS(null, "height", 100);
document.body.appendChild(tag);

// generate pattern in svg
hp.generate(artboard, "my-pattern");
```

#### Use Pattern in CSS

```css
// style the hexagons
#my-pattern hexagon {

    fill: red;
    stroke: blue;

}

// use pattern as fill on other elements
.some-class {

    fill: url(#my-pattern);

}
```


#### Use Pattern in JavaScript

```javascript
// assume the svg element already exists (let artboard) from above code for using the module

// generate svg shape
let tag = document.createElementNS("http://www.w3.org/2000/svg", "rect");
tag.setAttributeNS(null, "x", 0);
tag.setAttributeNS(null, "y", 0);
tag.setAttributeNS(null, "width", 50);
tag.setAttributeNS(null, "height", 50);
tag.setAttributeNS(null, "fill", "url(#my-pattern)");
artboard.appendChild(tag);
```
