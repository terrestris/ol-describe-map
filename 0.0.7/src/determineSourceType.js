"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineSourceType = void 0;
var BingMaps_1 = __importDefault(require("ol/source/BingMaps"));
var Cluster_1 = __importDefault(require("ol/source/Cluster"));
var Vector_1 = __importDefault(require("ol/source/Vector"));
// import GeoTIFF from 'ol/source/GeoTIFF';
var DataTile_1 = __importDefault(require("ol/source/DataTile"));
var IIIF_1 = __importDefault(require("ol/source/IIIF"));
var ImageArcGISRest_1 = __importDefault(require("ol/source/ImageArcGISRest"));
var ImageCanvas_1 = __importDefault(require("ol/source/ImageCanvas"));
var ImageMapGuide_1 = __importDefault(require("ol/source/ImageMapGuide"));
var ImageStatic_1 = __importDefault(require("ol/source/ImageStatic"));
var ImageWMS_1 = __importDefault(require("ol/source/ImageWMS"));
var OGCMapTile_1 = __importDefault(require("ol/source/OGCMapTile"));
var OGCVectorTile_1 = __importDefault(require("ol/source/OGCVectorTile"));
var VectorTile_1 = __importDefault(require("ol/source/VectorTile"));
var UrlTile_1 = __importDefault(require("ol/source/UrlTile"));
var CartoDB_1 = __importDefault(require("ol/source/CartoDB"));
var OSM_1 = __importDefault(require("ol/source/OSM"));
var StadiaMaps_1 = __importDefault(require("ol/source/StadiaMaps"));
var TileDebug_js_1 = __importDefault(require("ol/source/TileDebug.js"));
var XYZ_1 = __importDefault(require("ol/source/XYZ"));
var Raster_1 = __importDefault(require("ol/source/Raster"));
var TileArcGISRest_1 = __importDefault(require("ol/source/TileArcGISRest"));
var TileJSON_1 = __importDefault(require("ol/source/TileJSON"));
var TileWMS_1 = __importDefault(require("ol/source/TileWMS"));
var UTFGrid_1 = __importDefault(require("ol/source/UTFGrid"));
var WMTS_1 = __importDefault(require("ol/source/WMTS"));
var Zoomify_1 = __importDefault(require("ol/source/Zoomify"));
var determineSourceType = function (source) {
    var sourceType = 'unknown';
    if (source instanceof BingMaps_1.default) {
        sourceType = 'BingMaps';
    }
    else if (source instanceof Cluster_1.default) { // check Cluster first => child of vector
        sourceType = 'Cluster';
    }
    else if (source instanceof Vector_1.default) {
        sourceType = 'Vector';
        // Throws error when imported... TODO investigate
        // } else if (source instanceof GeoTIFF) { // check GeoTIFF first => child of DataTile
        //   sourceType = 'GeoTIFF';
    }
    else if (source instanceof DataTile_1.default) {
        sourceType = 'DataTile';
    }
    else if (source instanceof IIIF_1.default) {
        sourceType = 'IIIF';
    }
    else if (source instanceof ImageArcGISRest_1.default) {
        sourceType = 'ImageArcGISRest';
    }
    else if (source instanceof ImageCanvas_1.default) {
        sourceType = 'ImageCanvas';
    }
    else if (source instanceof ImageMapGuide_1.default) {
        sourceType = 'ImageMapGuide';
    }
    else if (source instanceof ImageStatic_1.default) {
        sourceType = 'ImageStatic';
    }
    else if (source instanceof ImageWMS_1.default) {
        sourceType = 'ImageWMS';
    }
    else if (source instanceof OGCMapTile_1.default) {
        sourceType = 'OGCMapTile';
    }
    else if (source instanceof OGCVectorTile_1.default) { // check OGCVectorTile first => child of VectorTile
        sourceType = 'OGCVectorTile'; // untested as of now
    }
    else if (source instanceof VectorTile_1.default) {
        sourceType = 'VectorTile';
    }
    else if (source instanceof CartoDB_1.default) { // Check CartoDB first => child of XYZ
        sourceType = 'CartoDB';
    }
    else if (source instanceof OSM_1.default) { // Check OSM first => child of XYZ
        sourceType = 'OpenStreetMap';
    }
    else if (source instanceof StadiaMaps_1.default) { // Check StadiaMaps first => child of XYZ
        sourceType = 'StadiaMaps';
    }
    else if (source instanceof TileDebug_js_1.default) { // Check TileDebug first => child of XYZ
        sourceType = 'TileDebug';
    }
    else if (source instanceof XYZ_1.default) {
        sourceType = 'XYZ';
    }
    else if (source instanceof Raster_1.default) {
        sourceType = 'Raster';
    }
    else if (source instanceof TileArcGISRest_1.default) {
        sourceType = 'TileArcGISRest';
    }
    else if (source instanceof TileJSON_1.default) {
        sourceType = 'TileJSON';
    }
    else if (source instanceof TileWMS_1.default) {
        sourceType = 'TileWMS';
    }
    else if (source instanceof UTFGrid_1.default) {
        sourceType = 'UTFGrid';
    }
    else if (source instanceof WMTS_1.default) {
        sourceType = 'WMTS';
    }
    else if (source instanceof Zoomify_1.default) {
        sourceType = 'Zoomify';
    }
    else if (source instanceof UrlTile_1.default) {
        sourceType = 'UrlTile';
    }
    return sourceType;
};
exports.determineSourceType = determineSourceType;
//# sourceMappingURL=determineSourceType.js.map