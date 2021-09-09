import test from "ava";

import { configuration, configurationDimension } from "../src/configuration.js";
import { HexagonPattern } from "../src/index.js";

/******************** EMPTY VARIABLES ********************/

// initialize
let hp = new HexagonPattern();

// TEST INIT //
test("init", t => {

    t.true(hp.unit != null);

});

// TEST get DATA //
test("get_data", t => {

    t.true(typeof(hp.data) == "object");
    t.true(hp.data.length == 8);

});

// TEST get DIMENSION //
test("get_dimension", t => {

    hp.dimensions;

    t.true(hp.height != null);
    t.true(hp.heightHexagon != null);
    t.true(hp.radiusHexagon != null);
    t.true(hp.widthHexagon != null);

});

// TEST get POINTS //
test("get_points", t => {

    let path = hp.points;

    t.true(typeof(path) == "string");

});

// TEST GENERATE //
test("generate", t => {

    // clear document
    document.body.innerHTML = "";

    // generate an svg artboard
    let tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tag.setAttributeNS(null, "id", "artboard");
    tag.setAttributeNS(null, "width", 100);
    tag.setAttributeNS(null, "height", 100);
    document.body.appendChild(tag);

    // get generated element
    let artboard = document.querySelector("#artboard");

    // generate pattern inside artboard
    hp.generate(artboard, "test");

    // get generated pattern
    let pattern = document.querySelector("#test");

    t.true(pattern !== undefined);
    t.true(pattern.nodeName == "pattern");

});

/******************** DECLARED PARAMS ********************/

let unit = 25;

// initialize
let hpp = new HexagonPattern(unit);

// TEST INIT //
test("init_params", t => {

    t.true(hpp.unit == unit);

});

// TEST get DATA //
test("get_data_params", t => {

    t.true(typeof(hpp.data) == "object");
    t.true(hpp.data.length == 8);

});

// TEST get DIMENSION //
test("get_dimension_params", t => {

    hp.dimensions;

    t.true(hpp.height != null);
    t.true(hpp.heightHexagon != null);
    t.true(hpp.radiusHexagon != null);
    t.true(hpp.widthHexagon != null);
    // ensure the unit has not been mutated
    t.true(hpp.unit == unit);

});

// TEST get POINTS //
test("get_points_parms", t => {

    let path = hpp.points;

    t.true(typeof(path) == "string");

});

// TEST GENERATE //
test("generate_params", t => {

    // clear document
    document.body.innerHTML = "";

    // generate an svg artboard
    let tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tag.setAttributeNS(null, "id", "artboard");
    tag.setAttributeNS(null, "width", 100);
    tag.setAttributeNS(null, "height", 100);
    document.body.appendChild(tag);

    // get generated element
    let artboard = document.querySelector("#artboard");

    // generate pattern inside artboard
    hpp.generate(artboard, "test");

    // get generated pattern
    let pattern = document.querySelector("#test");

    t.true(pattern !== undefined);
    t.true(pattern.nodeName == "pattern");

});
