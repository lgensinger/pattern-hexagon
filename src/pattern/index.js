import { select, selectAll } from "d3-selection";

import { configurationDimension } from "../configuration.js";

/**
 * Convert degree value to radian value.
 * @param {float} degree - degree of circle
 * @returns A float representing the specified degree in radians.
 */
function degreesToRadians(degree) {
    return degree * (Math.PI/180);
}

/**
 * HexagonPattern is an svg hexagon pattern.
 * @param {integer} unit - grid unit
 */
class HexagonPattern {
    constructor(unit=configurationDimension.unit) {

        // update self
        this.height = null;
        this.heightHexagon = null;
        this.radiusHexagon = null;
        this.svgPath = null;
        this.unit = unit;
        this.widthHexagon = null;

        // if unit is undefined use a cell size of 1 font size unit

        if (!unit) {

            // using font size as the base unit of measure make responsiveness easier to manage across devices
            this.unit = typeof window === "undefined" ? 16 : parseFloat(getComputedStyle(document.body).fontSize);

        }

        // calculate hexagon shape + pattern dimensions
        this.dimensions;

    }

    /**
     * Generate polygon data for tessellation shapes.
     * @returns An array of strings where each represents a hexagon transform value.
     */
    get data() {

        // rows of hexagons inside a single pattern swatch
        // it is this entire element that constitutes the pattern swatch which then gets repeted in an svg fill

        let top = [
            "translate(0, 0)",
            `translate(${this.widthHexagon}, 0)`,
            `translate(${this.unit}, 0)`
        ];

        let middle = [
            `translate(${this.widthHexagon / 2}, ${this.radius * 1.5})`,
            `translate(${this.widthHexagon * 1.5}, ${this.radius * 1.5})`
        ];

        let bottom = [
            `translate(0, ${this.height})`,
            `translate(${this.widthHexagon}, ${this.height})`,
            `translate(${this.unit}, ${this.height})`
        ];

        return top.concat(middle.concat(bottom));

    }

    /**
     * Determine polygon and pattern dimensions based on grid unit size.
     */
    get dimensions() {

        // calculate dimension for swatch since it will not be a perfect square
        this.widthHexagon = this.unit * 0.5;
        this.heightHexagon = this.widthHexagon / 0.8660254;
        this.radiusHexagon = this.heightHexagon / 2;
        this.height = this.radius * 3;

    }

    /**
     * Determine the coordinates of hexagon shapes inside the pattern grid.
     */
    get shapes() {

        // polygon points in clockwise order starting at the top point
        let p1 = [0,-this.radius];
        let p2 = [
            this.radius * Math.cos(degreesToRadians(30)),
            -(this.radius * Math.sin(degreesToRadians(30)))
        ];
        let p3 = [p2[0], p2[1] + this.radius];
        let p4 = [0,this.radius];
        let p5 = [
            (this.radius * Math.sin(degreesToRadians(240))),
            -this.radius * Math.cos(degreesToRadians(240))
        ];
        let p6 = [p5[0], p5[1] - this.radius];

        // generate list of points in hexagon
        let points = [p1,p2,p3,p4,p5,p6].map(d => d.join(","));

        // construct the svg path d value
        this.svgPath = points.join(" ");

    }

    /**
     * Generate an SVG hexagon tessellation.
     * @param {domNode} artboard - svg dom element
     * @param {string} id - pattern id
     */
    generate(artboard, id) {

        // add pattern element
        let pattern = select(artboard)
            .append("pattern")
            .attr("id", id)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.height)
            .attr("patternUnits", "userSpaceOnUse");

        // background
        pattern.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.height);

        // generate shapes
        pattern
            .selectAll("polygon")
            .data(this.data)
            .enter()
            .append("polygon")
            .attr("transform", d => d)
            .attr("points", this.svgPath);

    }

};

export { HexagonPattern };
export default HexagonPattern;
