"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewDescriptionToText = void 0;
var util_1 = require("./util");
var rotationToText = function (rotation) {
    var absDegrees = (0, util_1.rad2deg)(Math.abs(rotation));
    var isRotated = 'This map is rotated';
    var direction = rotation > 0 ? 'clockwise' : 'counter-clockwise';
    var rightLeft = rotation > 0 ? 'right' : 'left';
    if (absDegrees % 360 === 0) {
        return 'This map is not rotated, north is at the top. ';
    }
    else if (absDegrees % 180 === 0) {
        return "".concat(isRotated, ": North is at the bottom of the map. ");
    }
    else if (absDegrees % 270 === 0 || absDegrees % 90 === 0) {
        return "".concat(isRotated, "; North is at the ").concat(rightLeft, "-hand side of the map. ");
    }
    return "".concat(isRotated, " ").concat(direction, " by roughly ").concat((0, util_1.roundTo)(absDegrees, 2), " degrees. ");
};
var viewDescriptionToText = function (viewDesc) {
    var _a, _b, _c, _d;
    var parts = [];
    var _e = viewDesc.center, center = _e === void 0 ? [0, 0] : _e, _f = viewDesc.rotation, rotation = _f === void 0 ? 0 : _f, _g = viewDesc.projection, projection = _g === void 0 ? '' : _g, _h = viewDesc.epsg4326, epsg4326 = _h === void 0 ? {} : _h;
    var viewProjIsNotEpsg4326 = viewDesc.projection !== 'EPSG:4326';
    if (epsg4326.center) {
        parts.push('This map is currently centered at the following latitude and ' +
            "longitude coordinate ".concat(util_1.formatCoordinate.apply(void 0, epsg4326.center), ". "));
    }
    if (projection) {
        parts.push("The map projection that is used in the map has the code ".concat(viewDesc.projection, ". "));
    }
    if (viewProjIsNotEpsg4326) {
        parts.push("Expressed in units of the used map-projection the center is at ".concat(util_1.formatCoordinate.apply(void 0, center), ". "));
    }
    if (epsg4326.bbox) {
        parts.push("The view has an extent of ".concat((0, util_1.formatBBOX)(epsg4326.bbox || []), " (latitude/longitude) "));
        parts.push("i.e. the lower left point is at ".concat((0, util_1.formatCoordinate)((_a = epsg4326.bbox) === null || _a === void 0 ? void 0 : _a[0], (_b = epsg4326.bbox) === null || _b === void 0 ? void 0 : _b[1])));
        parts.push(", the upper right is at ".concat((0, util_1.formatCoordinate)((_c = epsg4326.bbox) === null || _c === void 0 ? void 0 : _c[2], (_d = epsg4326.bbox) === null || _d === void 0 ? void 0 : _d[3]), ". "));
    }
    if (viewProjIsNotEpsg4326 && viewDesc.bbox && projection) {
        parts.push("Since the map uses ".concat(projection, " as projection, ") +
            "the extent is actually ".concat((0, util_1.formatBBOX)(viewDesc.bbox || []), ". "));
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