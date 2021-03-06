# Pattern Hexagon

ES6 svg hexagon pattern.

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
let artboard = document.createElementNS("http://www.w3.org/2000/svg", "svg");
artboard.setAttributeNS(null, "id", "artboard");
artboard.setAttributeNS(null, "width", 100);
artboard.setAttributeNS(null, "height", 100);
document.body.appendChild(artboard);

// generate pattern in svg
hp.generate(artboard, "my-pattern");
```

#### Use Pattern in CSS

```css
// style the hexagons
#my-pattern polygon {

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
let rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rectangle.setAttributeNS(null, "x", 0);
rectangle.setAttributeNS(null, "y", 0);
rectangle.setAttributeNS(null, "width", 50);
rectangle.setAttributeNS(null, "height", 50);
rectangle.setAttributeNS(null, "fill", "url(#my-pattern)");
artboard.appendChild(rectangle);
```
