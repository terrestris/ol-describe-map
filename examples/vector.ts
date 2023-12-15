import 'ol/ol.css';
import { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { useGeographic } from 'ol/proj';
import { StyleFunction } from 'ol/style/Style';
import { Circle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import View from 'ol/View.js';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('json', json);

import { describe } from '../src/index';

const fillTiny = new Fill({
  color: '#843ac5',
});
const fillMed = new Fill({
  color: 'rgba(255,30,30,0.5)',
});
const fillBig = new Fill({
  color: 'rgba(255,165,30,0.5)',
});

const strokeTiny = new Stroke({
  color: 'rgba(255,255,255, 0.4)',
  width: 1
});
const strokeMed = new Stroke({
  color: 'rgb(255,30,30)',
  width: 2
});
const strokeBig = new Stroke({
  color: 'rgb(255, 165, 30)',
  width: 2
});

let tiny = new Style({
  image: new Circle({
    fill: fillTiny,
    stroke: strokeTiny,
    radius: 3
  })
});
let medium = new Style({
  image: new Circle({
    fill: fillMed,
    stroke: strokeMed,
    radius: 6
  }),
  zIndex: 1
});
let big = new Style({
  image: new RegularShape({
    fill: fillBig,
    stroke: strokeBig,
    points: 5,
    radius1: 5,
    radius2: 12,
    rotation: Math.PI/5
  }),
  zIndex: 2
});

let label = new Style({
  text: new Text({
    offsetY: 13,
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 4,
    }),
  }),
  zIndex: 3
});

const THRESHOLD_POP_TINY = 500_000;
const THRESHOLD_POP_MEDIUM = 1_000_000;
const THRESHOLD_RESOLUTION_SHOW_TINY = 1_000;
const FONT_MEDIUM = '10px Calibri,sans-serif';
const FONT_BIG = 'bold 13px Calibri,sans-serif';

const styleFunction: StyleFunction = (feature: FeatureLike, resolution: number): Style|Style[]|undefined => {
  const {
    pop,
    name
  } = feature.getProperties();
  let t = label.getText();
  if (pop < THRESHOLD_POP_TINY) {
    if (resolution < THRESHOLD_RESOLUTION_SHOW_TINY) {
      return tiny;
    }
  } else if (pop < THRESHOLD_POP_MEDIUM) {
    t.setFont(FONT_MEDIUM);
    t.setText(name);
    return [medium, label];
  } else {
    t.setFont(FONT_BIG);
    t.setText(name);
    return [big, label];
  }
};

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: './germany.geojson',
    format: new GeoJSON(),
    attributions: '<a href="https://github.com/pensnarik/german-cities">Cities of Germany</a>'
  }),
  style: styleFunction
});

useGeographic();
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      opacity: 0.33
    }),
    vectorLayer
  ],
  target: 'map',
  view: new View({
    center: [8.8, 51.3],
    zoom: 5
  })
});

const descElem = document.getElementById('map-description');
const rawElem = document.getElementById('raw-description');
const speakBtn= document.getElementById('speak');

const describeMapAndUpdateInfo = async () => {
  const description = await describe(map, {viewDescriber: () => {}});

  const highlighted = hljs.highlight(
    JSON.stringify(description, undefined, '  '),
    {language: 'json'}
  ).value;

  (descElem as HTMLDivElement).innerHTML = description.text;
  (rawElem as HTMLDivElement).innerHTML = highlighted;
  (speakBtn as HTMLButtonElement).disabled = description.text === '';
};

map.on('moveend', describeMapAndUpdateInfo);
vectorLayer.on('change', describeMapAndUpdateInfo);

describeMapAndUpdateInfo();

if (speakBtn) {
  speakBtn.addEventListener('click', () => {
    const text = descElem?.innerHTML;
    if (text) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.speak(msg);
    }
  });
}
