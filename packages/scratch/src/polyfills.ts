//import "zone.js/dist/zone";

import "classlist.js";

import "core-js/features/reflect";
import "core-js/features/array";
import "core-js/features/object";

if (typeof SVGElement.prototype.contains === "undefined") {
    SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
}