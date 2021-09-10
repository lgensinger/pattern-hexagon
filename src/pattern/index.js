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
        this.pattern = null;
        this.radiusHexagon = null;
        this.svgPath = null;
        this.unit = unit;
        this.widthHexagon = null;

        // if unit is undefined use a swatch size of 1 font size unit

        if (!unit) {

            // using font size as the base unit of measure make responsiveness easier to manage across devices
            this.unit = typeof window === "undefined" ? 16 : parseFloat(getComputedStyle(document.body).fontSize);

        }

        // calculate hexagon shape + pattern dimensions
        this.dimensions;
        this.svgPath = this.points;

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
            `translate(${this.widthHexagon / 2}, ${this.radiusHexagon * 1.5})`,
            `translate(${this.widthHexagon * 1.5}, ${this.radiusHexagon * 1.5})`
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
        this.height = this.radiusHexagon * 3;

    }

    /**
     * Determine the coordinates of hexagon shape.
     * @returns A string representing a hexagon described by the svg path value to render it.
     */
    get points() {

        // polygon points in clockwise order starting at the top point
        let p1 = [0,-this.radiusHexagon];
        let p2 = [
            this.radiusHexagon * Math.cos(degreesToRadians(30)),
            -(this.radiusHexagon * Math.sin(degreesToRadians(30)))
        ];
        let p3 = [p2[0], p2[1] + this.radiusHexagon];
        let p4 = [0,this.radiusHexagon];
        let p5 = [
            (this.radiusHexagon * Math.sin(degreesToRadians(240))),
            -this.radiusHexagon * Math.cos(degreesToRadians(240))
        ];
        let p6 = [p5[0], p5[1] - this.radiusHexagon];

        // generate list of points in hexagon
        let points = [p1,p2,p3,p4,p5,p6].map(d => d.join(","));

        // construct the svg path d value
        return points.join(" ");

    }

    /**
     * Generate polygon in pattern.
     * @param {array} points - strings where each is a hexagon transform
     */
    hexagon(points) {

        // generate shapes
        this.pattern
            .selectAll("polygon")
            .data(points)
            .enter()
            .append("polygon")
            .attr("transform", d => d)
            .attr("points", this.svgPath);

    }

    /**
     * Generate an SVG hexagon tessellation.
     * @param {domNode} artboard - svg dom element
     * @param {string} id - pattern id
     */
    generate(artboard, id) {

        // add pattern element
        this.pattern = select(artboard)
            .append("pattern")
            .attr("id", id)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.height)
            .attr("patternUnits", "userSpaceOnUse");

        // background
        this.pattern.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.height);

        // generate hexagons
        this.hexagon(this.data);

    }

};

export { HexagonPattern };
export default HexagonPattern;
