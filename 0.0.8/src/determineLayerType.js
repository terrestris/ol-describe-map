"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineLayerType = void 0;
var BaseImage_1 = __importDefault(require("ol/layer/BaseImage"));
var BaseTile_1 = __importDefault(require("ol/layer/BaseTile"));
var BaseVector_1 = __importDefault(require("ol/layer/BaseVector"));
var determineLayerType = function (layer) {
    var layerType = 'unknown';
    if (layer instanceof BaseImage_1.default) {
        layerType = 'image-layer (server-rendered & for arbitrary extents and resolutions)';
    }
    else if (layer instanceof BaseTile_1.default) {
        layerType = 'tile-layer (pre-rendered, tiled images in grids organized by zoom levels)';
    }
    else if (layer instanceof BaseVector_1.default) {
        layerType = 'vector-layer (vector data that is rendered client-side)';
    }
    return layerType;
};
exports.determineLayerType = determineLayerType;
//# sourceMappingURL=determineLayerType.js.map