import { determineSourceType } from './determineSourceType';

import Source from 'ol/source/Source';

import BingMaps from 'ol/source/BingMaps';
import Cluster from 'ol/source/Cluster';
import Vector from 'ol/source/Vector';
import GeoTIFF from 'ol/source/GeoTIFF';
import DataTile from 'ol/source/DataTile';
import IIIF from 'ol/source/IIIF';
import ImageArcGISRest from 'ol/source/ImageArcGISRest';
import ImageCanvas from 'ol/source/ImageCanvas';
import ImageMapGuide from 'ol/source/ImageMapGuide';
import ImageStatic from 'ol/source/ImageStatic';
import ImageWMS from 'ol/source/ImageWMS';
import OGCMapTile from 'ol/source/OGCMapTile';
import OGCVectorTile from 'ol/source/OGCVectorTile';
import MVT from 'ol/format/MVT';
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
import WMTSTileGrid from 'ol/tilegrid/WMTS';

describe('determineSourceType', () => {
  test('detects BaseImageLayer', () => {
    const source = new BingMaps({key: '', imagerySet: 'Aerial'});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/BingMaps/gi);
  });
  test('detects Cluster', () => {
    const source = new Cluster({});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/Cluster/gi);
  });
  test('detects Vector', () => {
    const source = new Vector();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/Vector/gi);
  });
  test('detects DataTile', () => {
    const source = new DataTile({});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/DataTile/gi);
  });
  test('detects IIIF', () => {
    const source = new IIIF({size: [1, 1]});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/IIIF/gi);
  });
  test('detects ImageArcGISRest', () => {
    const source = new ImageArcGISRest({});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/ImageArcGISRest/gi);
  });
  test('detects ImageCanvas', () => {
    const source = new ImageCanvas();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/ImageCanvas/gi);
  });
  test('detects ImageMapGuide', () => {
    const source = new ImageMapGuide({});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/ImageMapGuide/gi);
  });
  test('detects ImageStatic', () => {
    const source = new ImageStatic({url:'', imageExtent:[0,0,1,1]});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/ImageStatic/gi);
  });
  test('detects ImageWMS', () => {
    const source = new ImageWMS();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/ImageWMS/gi);
  });
  test('detects OGCMapTile', () => {
    const source = new OGCMapTile({url: ''});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/OGCMapTile/gi);
  });
  // test('detects OGCVectorTile', () => {
  //   const source = new OGCVectorTile({
  //     url: 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0
  //     countries/tiles/WebMercatorQuad',
  //     format: new MVT()
  //   });
  //   const detected = determineSourceType(source);
  //   expect(detected).toMatch(/OGCVectorTile/gi);
  // });
  test('detects VectorTile', () => {
    const source = new VectorTile({});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/VectorTile/gi);
  });
  test('detects UrlTile', () => {
    const source = new UrlTile({tileLoadFunction:()=>{}});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/UrlTile/gi);
  });
  test('detects CartoDB', () => {
    const source = new CartoDB({});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/CartoDB/gi);
  });
  test('detects OSM', () => {
    const source = new OSM();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/OSM/gi);
  });
  test('detects StadiaMaps', () => {
    const source = new StadiaMaps({layer: 'stamen_terrain', apiKey: '', retina: false});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/StadiaMaps/gi);
  });
  test('detects TileDebug', () => {
    const source = new TileDebug();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/TileDebug/gi);
  });
  test('detects XYZ', () => {
    const source = new XYZ();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/XYZ/gi);
  });
  test('detects Raster', () => {
    const source = new Raster({sources: [new XYZ()]});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/Raster/gi);
  });
  test('detects TileArcGISRest', () => {
    const source = new TileArcGISRest();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/TileArcGISRest/gi);
  });
  test('detects TileJSON', () => {
    const source = new TileJSON({url: 'foo'});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/TileJSON/gi);
  });
  test('detects TileWMS', () => {
    const source = new TileWMS();
    const detected = determineSourceType(source);
    expect(detected).toMatch(/TileWMS/gi);
  });
  test('detects UTFGrid', () => {
    const source = new UTFGrid({url: 'foo'});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/UTFGrid/gi);
  });
  test('detects WMTS', () => {
    const source = new WMTS({
      tileGrid:  new WMTSTileGrid({
        resolutions: [1],
        matrixIds: ['1'],
        origin: [0, 0]
      }),
      layer: '',
      style: '',
      matrixSet: ''
    });
    const detected = determineSourceType(source);
    expect(detected).toMatch(/WMTS/gi);
  });
  test('detects Zoomify', () => {
    const source = new Zoomify({url: '', size: [1, 1]});
    const detected = determineSourceType(source);
    expect(detected).toMatch(/Zoomify/gi);
  });
});
