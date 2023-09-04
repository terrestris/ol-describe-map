"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerDescriptionsToText = void 0;
var util_1 = require("./util");
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
//# sourceMappingURL=layerDescriptionsToText.js.map