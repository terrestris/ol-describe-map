import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';
import 'ol/ol.css';

import { describe as describeOlMap } from '../../src/index';

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

map.addInteraction(new DragRotateAndZoom());

const describeMapAndUpdateInfo = async () => {
  const description = await describeOlMap(map);
  const elem = document.getElementById('map-description');
  (elem as HTMLDivElement).innerHTML = description.text;
};

map.on('moveend', describeMapAndUpdateInfo);

describeMapAndUpdateInfo();
