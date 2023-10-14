import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';
import 'ol/ol.css';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('json', json);

import { describe as describeOlMap } from '../src/index';
import { nominatimTextualDescriber } from '../src/nominatimTextualDescriber';
import { transform } from 'ol/proj';

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    center: transform([7, 51], 'EPSG:4326', 'EPSG:3857'),
    zoom: 10,
  }),
});

map.addInteraction(new DragRotateAndZoom());


const descElem = document.getElementById('map-description');
const rawElem = document.getElementById('raw-description');
const speakBtn = document.getElementById('speak');

const describeMapAndUpdateInfo = async () => {
  const description = await describeOlMap(map, {textualDescriber: nominatimTextualDescriber});

  const highlighted = hljs.highlight(
    JSON.stringify(description, undefined, '  '),
    {language: 'json'}
  ).value;

  (descElem as HTMLDivElement).innerHTML = description.text;
  (rawElem as HTMLDivElement).innerHTML = highlighted;

  map.getTargetElement().setAttribute('aria-description', description.text);

  (speakBtn as HTMLButtonElement).disabled = description.text === '';
};

map.on('moveend', describeMapAndUpdateInfo);

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
