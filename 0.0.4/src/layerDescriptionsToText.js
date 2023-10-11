"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerDescriptionsToText = void 0;
var util_1 = require("./util");
/**
 *
 * @param layerDescs LayerDescription[] Desciptions of layers.
 * @returns string[]
 */
var layerDescriptionsToText = function (layerDescs) {
    var parts = [];
    var pluralS = layerDescs.length !== 1 ? 's' : '';
    var andOnly = layerDescs.length === 1 ? ' and only ' : '';
    parts.push("The map contains ".concat(layerDescs.length, " layer").concat(pluralS, ". "));
    layerDescs.forEach(function (layerDesc, idx) {
        var n1 = (0, util_1.startsWithVowel)(layerDesc.type) ? 'n' : '';
        var n2 = (0, util_1.startsWithVowel)(layerDesc.source) ? 'n' : '';
        parts.push("The ".concat((0, util_1.stringifyNumber)(idx + 1)).concat(andOnly, " layer is a").concat(n1, " ").concat(layerDesc.type, ". "));
        parts.push();
        parts.push("It uses a".concat(n2, " ").concat(layerDesc.source, "-source as source for it's data. "));
        // add vector details to textual description
        if (layerDesc.source === 'Vector') {
            parts = vectorLayersDetailsToText(layerDesc, parts);
        }
        if (idx === 0 && layerDescs.length > 1) {
            parts.push('This layer is the lowest in the drawing order, other layers are drawn atop of it. ');
        }
        if (idx === layerDescs.length - 1 && layerDescs.length !== 1) {
            parts.push('This layer is top-most in the drawing order.');
        }
    });
    return parts;
};
exports.layerDescriptionsToText = layerDescriptionsToText;
var vectorLayersDetailsToText = function (layerDesc, parts) {
    if (layerDesc.details == null) {
        return parts;
    }
    var _a = layerDesc.details, total = _a.numTotalFeaturesInSource, _b = _a.numFeaturesInExtent, inExtent = _b === void 0 ? 0 : _b, _c = _a.numRenderedFeaturesInExtent, rendered = _c === void 0 ? 0 : _c, _d = _a.renderedStatistics, renderStats = _d === void 0 ? undefined : _d;
    var pluralSTotal = total === 1 ? '' : 's';
    var wereWas = rendered === 1 ? 'was' : 'were';
    var renderedPlurals = rendered === 1 ? '' : 's';
    parts.push("The layer source contains ".concat((0, util_1.localNum)(total), " feature").concat(pluralSTotal, ". "));
    if (inExtent > 0) {
        var percentInExtent = (0, util_1.makePercentInfo)(inExtent, total);
        var percentRendered = (0, util_1.makePercentInfo)(rendered, inExtent);
        parts.push("A total number of ".concat((0, util_1.localNum)(inExtent)).concat(percentInExtent, " "));
        parts.push("intersect with the current map-extent; actually rendered ".concat(wereWas, " "));
        parts.push("".concat((0, util_1.localNum)(rendered)).concat(percentRendered, " feature").concat(renderedPlurals, ". "));
    }
    if (renderStats) {
        var properties = Object.keys(renderStats);
        if (properties.length > 0) {
            var yOrIes = properties.length === 1 ? 'y' : 'ies';
            parts.push("From the rendered feature".concat(renderedPlurals, " "));
            parts.push("basic statistical information for the following propert".concat(yOrIes, " "));
            parts.push("can be obtained: '".concat(properties.join('\', \''), "'. "));
            properties.forEach(function (prop) {
                var stats = renderStats[prop];
                var minPlace = stats.minName ? " (feature named '".concat(stats.minName, "')") : '';
                var maxPlace = stats.maxName ? " (for the feature with name '".concat(stats.maxName, "')") : '';
                if (rendered > 1) {
                    parts.push("Property '".concat(prop, "': the minimal value is ").concat((0, util_1.localNum)(stats.min)).concat(minPlace, " "));
                    parts.push("while the maximum value is ".concat((0, util_1.localNum)(stats.max)).concat(maxPlace, ". The average "));
                    parts.push("value is ".concat((0, util_1.localNum)(stats.avg), " and the sum is ").concat((0, util_1.localNum)(stats.sum), ". "));
                }
                else {
                    parts.push("For the property ".concat(prop, " the value is ").concat((0, util_1.localNum)(stats.min)).concat(minPlace, ". "));
                }
            });
        }
    }
    return parts;
};
//# sourceMappingURL=layerDescriptionsToText.js.map