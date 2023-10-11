import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';

import {
  defaultLayerDescriber
} from './defaultLayerDescriber';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { VectorLayerDetails } from './types';

let div;
let map;
let view;
let tileLayer;
let vectorLayer;

describe('defaultLayerDescriber', () => {
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);

    tileLayer = new TileLayer({
      source: new OSM(),
      opacity: 0.33
    });
    let vectorSource = new VectorSource();
    vectorSource.addFeature(new Feature({
      geometry: new Point([0, 0]),
      name: 'Null Island',
      someProp: 1
    }));
    vectorLayer = new VectorLayer({
      source: vectorSource
    });

    view = new View({
      center: [0, 0],
      zoom: 2
    });

    map = new Map({
      layers: [
        tileLayer
      ],
      view,
      target: div
    });
  });

  afterEach(() => {
    map.dispose();
    div.parentNode?.removeChild(div);
  });

  test('describes a tile layer', async () => {
    let got = await defaultLayerDescriber(tileLayer, view);
    expect(got.source).toStrictEqual('OpenStreetMap');
  });

  test('describes a vector layer', async () => {
    let got = await defaultLayerDescriber(vectorLayer, view);
    expect(got.source).toStrictEqual('Vector');
    expect(got.details).not.toBeNull();
    const details = got.details as VectorLayerDetails;
    expect(details.numTotalFeaturesInSource).toBe(1);
    expect(details.numFeaturesInExtent).toBe(1);
    expect(details.numRenderedFeaturesInExtent).toBe(1);
    expect(details.numSkippedFeaturesInExtent).toBe(0);
  });

  test('describes a vector layer (wo/ features)', async () => {
    (vectorLayer.getSource() as VectorSource).clear();
    let got = await defaultLayerDescriber(vectorLayer, view);
    expect(got.source).toStrictEqual('Vector');
    expect(got.details).not.toBeNull();
    const details = got.details as VectorLayerDetails;
    expect(details.numTotalFeaturesInSource).toBe(0);
    expect(details.numFeaturesInExtent).toBe(0);
    expect(details.numRenderedFeaturesInExtent).toBe(0);
    expect(details.numSkippedFeaturesInExtent).toBe(0);
  });
});
