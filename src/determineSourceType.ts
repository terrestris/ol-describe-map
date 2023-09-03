import Source from 'ol/source/Source';

import BingMaps from 'ol/source/BingMaps';
import Cluster from 'ol/source/Cluster';
import Vector from 'ol/source/Vector';
// import GeoTIFF from 'ol/source/GeoTIFF';
import DataTile from 'ol/source/DataTile';
import IIIF from 'ol/source/IIIF';
import ImageArcGISRest from 'ol/source/ImageArcGISRest';
import ImageCanvas from 'ol/source/ImageCanvas';
import ImageMapGuide from 'ol/source/ImageMapGuide';
import ImageStatic from 'ol/source/ImageStatic';
import ImageWMS from 'ol/source/ImageWMS';
import OGCMapTile from 'ol/source/OGCMapTile';
import OGCVectorTile from 'ol/source/OGCVectorTile';
import VectorTile from 'ol/source/VectorTile';
import UrlTile from 'ol/source/UrlTile';
import CartoDB from 'ol/source/CartoDB';
import OSM from 'ol/source/OSM';
import StadiaMaps from 'ol/source/StadiaMaps';
import TileDebug from 'ol/source/TileDebug.js';
import XYZ from 'ol/source/XYZ';
import Raster from 'ol/source/Raster';
import TileArcGISRest from 'ol/source/TileArcGISRest';
import TileJSON from 'ol/source/TileJSON';
import TileWMS from 'ol/source/TileWMS';
import UTFGrid from 'ol/source/UTFGrid';
import WMTS from 'ol/source/WMTS';
import Zoomify from 'ol/source/Zoomify';


export const determineSourceType = (source: Source): string => {
  let sourceType = 'unknown';

  if (source instanceof BingMaps) {
    sourceType = 'BingMaps';
  } else if (source instanceof Cluster) { // check Cluster first => child of vector
    sourceType = 'Cluster';
  } else if (source instanceof Vector) {
    sourceType = 'Vector';
  // Throws error when imported... TODO investigate
  // } else if (source instanceof GeoTIFF) { // check GeoTIFF first => child of DataTile
  //   sourceType = 'GeoTIFF';
  } else if (source instanceof DataTile) {
    sourceType = 'DataTile';
  } else if (source instanceof IIIF) {
    sourceType = 'IIIF';
  } else if (source instanceof ImageArcGISRest) {
    sourceType = 'ImageArcGISRest';
  } else if (source instanceof ImageCanvas) {
    sourceType = 'ImageCanvas';
  } else if (source instanceof ImageMapGuide) {
    sourceType = 'ImageMapGuide';
  } else if (source instanceof ImageStatic) {
    sourceType = 'ImageStatic';
  } else if (source instanceof ImageWMS) {
    sourceType = 'ImageWMS';
  } else if (source instanceof OGCMapTile) {
    sourceType = 'OGCMapTile';
  } else if (source instanceof OGCVectorTile) { // check OGCVectorTile first => child of VectorTile
    sourceType = 'OGCVectorTile'; // untested as of now
  } else if (source instanceof VectorTile) {
    sourceType = 'VectorTile';
  } else if (source instanceof CartoDB) { // Check CartoDB first => child of XYZ
    sourceType = 'CartoDB';
  } else if (source instanceof OSM) { // Check OSM first => child of XYZ
    sourceType = 'OSM';
  } else if (source instanceof StadiaMaps) { // Check StadiaMaps first => child of XYZ
    sourceType = 'StadiaMaps';
  } else if (source instanceof TileDebug) { // Check TileDebug first => child of XYZ
    sourceType = 'TileDebug';
  } else if (source instanceof XYZ) {
    sourceType = 'XYZ';
  } else if (source instanceof Raster) {
    sourceType = 'Raster';
  } else if (source instanceof TileArcGISRest) {
    sourceType = 'TileArcGISRest';
  } else if (source instanceof TileJSON) {
    sourceType = 'TileJSON';
  } else if (source instanceof TileWMS) {
    sourceType = 'TileWMS';
  } else if (source instanceof UTFGrid) {
    sourceType = 'UTFGrid';
  } else if (source instanceof WMTS) {
    sourceType = 'WMTS';
  } else if (source instanceof Zoomify) {
    sourceType = 'Zoomify';
  } else if (source instanceof UrlTile) {
    sourceType = 'UrlTile';
  }
  return sourceType;
};
