"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewDescriptionToText = void 0;
var util_1 = require("./util");
/**
 * Converts a rotation in radians to a descriptive sentence.
 *
 * @param {number} rotation - The rotation angle in radians to describe.
 * @returns {string} A descriptive sentence based on the rotation angle.
 */
var rotationToText = function (rotation) {
    // Constants for circle and direction angles
    var CIRCLE_DEGREES = 360;
    var HALF_CIRCLE_DEGREES = 180;
    var UP_DEGREES = 0;
    var RIGHT_DEGREES = 90;
    var DOWN_DEGREES = 180;
    var LEFT_DEGREES = 270;
    // reusable text for rotated map
    var isRotated = 'This map is rotated';
    // Convert to degrees and ensure it is within [0, 360) range
    var degrees = (0, util_1.rad2deg)(rotation) % CIRCLE_DEGREES;
    if (degrees < 0) {
        degrees = CIRCLE_DEGREES + degrees;
    }
    // Handle special cases for cardinal directions
    if (degrees === UP_DEGREES) {
        return 'This map is not rotated, north is at the top. ';
    }
    else if (degrees === RIGHT_DEGREES) {
        return "".concat(isRotated, ", north is at the right-hand side. ");
    }
    else if (degrees === DOWN_DEGREES) {
        return "".concat(isRotated, ", north is at the bottom. ");
    }
    else if (degrees === LEFT_DEGREES) {
        return "".concat(isRotated, ", north is at the left-hand side. ");
    }
    // Determine the rotation direction and describe it
    var direction = 'clockwise';
    if (degrees > HALF_CIRCLE_DEGREES) {
        degrees = CIRCLE_DEGREES - degrees;
        direction = 'counter-clockwise';
    }
    // Return the description including the direction and rounded degrees
    return "".concat(isRotated, " ").concat(direction, " by roughly ").concat((0, util_1.roundTo)(degrees, 2), " degrees. ");
};
/**
 * Converts a description of the view to a bunch of descriptive sentences.
 *
 * @param {ViewDescription} viewDesc - an object describing various aspects of the view.
 * @returns {string[]} A bunch of descriptive sentences based on the passed apects of
 *   the view.
 */
var viewDescriptionToText = function (viewDesc) {
    var _a, _b, _c, _d;
    var parts = [];
    var _e = viewDesc.rotation, rotation = _e === void 0 ? 0 : _e, _f = viewDesc.viewProjection, viewProjection = _f === void 0 ? '' : _f, _g = viewDesc.epsg4326, epsg4326 = _g === void 0 ? {} : _g;
    if (epsg4326.center) {
        parts.push('This map is currently centered at the following latitude and ' +
            "longitude coordinate ".concat(util_1.formatCoordinate.apply(void 0, epsg4326.center), ". "));
    }
    if (viewProjection) {
        parts.push("The map projection that is used in the map has the code ".concat(viewProjection, ". "));
    }
    if (epsg4326.bbox) {
        parts.push("The view has an extent of ".concat((0, util_1.formatBBOX)(epsg4326.bbox || []), " (latitude/longitude) "));
        parts.push("i.e. the lower left point is at ".concat((0, util_1.formatCoordinate)((_a = epsg4326.bbox) === null || _a === void 0 ? void 0 : _a[0], (_b = epsg4326.bbox) === null || _b === void 0 ? void 0 : _b[1])));
        parts.push(", the upper right is at ".concat((0, util_1.formatCoordinate)((_c = epsg4326.bbox) === null || _c === void 0 ? void 0 : _c[2], (_d = epsg4326.bbox) === null || _d === void 0 ? void 0 : _d[3]), ". "));
    }
    parts.push(rotationToText(rotation));
    if (viewDesc.scale) {
        parts.push("The map has a scale of roughly 1:".concat((0, util_1.roundTo)(viewDesc.scale, 0).toLocaleString('en-GB'), ". "));
    }
    if (viewDesc.zoom) {
        parts.push("Currently the map is zoomed to level ".concat((0, util_1.roundTo)(viewDesc.zoom, 2), "."));
    }
    return parts;
};
exports.viewDescriptionToText = viewDescriptionToText;
//# sourceMappingURL=viewDescriptionToText.js.map