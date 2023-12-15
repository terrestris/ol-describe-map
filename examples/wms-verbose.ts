import 'ol/ol.css';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import { useGeographic } from 'ol/proj';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View.js';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('json', json);

import { describe } from '../src/index';
import { LayerDescriberFunc, TextualDescriberFunc, WMSLayerDetails } from '../src/types';

// a tiled layer with WMS source
const bodenuebersichtskarte = new TileLayer({
  source: new TileWMS({
    url: 'https://services.bgr.de/wms/boden/buek1000de/',
    params: {
      LAYERS: '0'
    },
    attributions: '<a href="https://numis.niedersachsen.de/trefferanzeige?docuuid=A95' +
      'A723E-1274-4601-9E60-27079436F1F3&plugid=/ingrid-group:iplug-csw-dsc-bgr&docid' +
      '=M1D3lHgBjnMBqM0vib5Q">BÜK1000 V2.1</a>, (C) BGR, Hannover, 2013'
  })
});

// a single tile layer with WMS source
const verwaltungsgebiete = new ImageLayer({
  source: new ImageWMS({
    url: 'https://sgx.geodatenzentrum.de/wms_vg5000_1231',
    params: {
      LAYERS: 'vg5000_lan,vg5000_rbz,vg5000_krs'
    },
    attributions: 'Verwaltungsgebiete: © <a href="https://gdz.bkg.bund.de/index.php/' +
      'default/webdienste/verwaltungsgebiete/wms-verwaltungsgebiete-1-5-000-000-stan' +
      'd-31-12-wms-vg5000-1231.html">GeoBasis-DE / BKG (' + (new Date()).getFullYear() +
      ')</a>'
  })
});

useGeographic();
const map = new Map({
  layers: [
    bodenuebersichtskarte,
    verwaltungsgebiete
  ],
  target: 'map',
  view: new View({
    center: [9.85, 49.31],
    zoom: 8
  }),
});

const descElem = document.getElementById('map-description');
const rawElem = document.getElementById('raw-description');
const speakBtn = document.getElementById('speak');

const valOrFallback = (val, fallback = '—') => {
  return `${val || fallback}`;
};
const dlEntry = (term, definition) => {
  if (definition) {
    return `<dt>${term}</dt><dd>${definition}</dd>`;
  }
  return '';
};
const toUnorderedList = (arr: string[]) => {
  if (arr.length > 0) {
    return `<ul><li>${arr.join('</li><li>')}</li></ul>`;
  }
  return '';
};


const myTextualDescriber: TextualDescriberFunc = async (viewDesc, layerDescs = []) => {
  let parts: string[] = [];
  let pluralS = layerDescs.length !== 1 ? 's' : '';

  parts.push('<section>');
  parts.push('<h2>Layerdescriptions</h2>');
  parts.push(`The map contains ${layerDescs.length} layer${pluralS}: `);

  let columns = ['Name', 'Title', 'Abstract', 'Metadata'];
  layerDescs.forEach(layerDesc => {
    const {
      wmsLayerNames = [],
      wmsLayerAbstracts = [],
      wmsLayerTitles = [],
      wmsLayerMetadataURLs = [],
      topLevelLayerAbstract = '',
      topLevelLayerTitle = '',
      serviceAbstract = '',
      serviceKeywords = [],
      serviceTitle = ''
    } = layerDesc.details as WMSLayerDetails;

    parts.push('<section class="wms-desc">');
    if (serviceTitle) {
      parts.push(`<h3>${serviceTitle}</h3>`);
    }
    parts.push('<table>');
    parts.push(`<caption>Displayed layers from WMS "${serviceTitle}"</caption>`);
    parts.push('<thead>');
    parts.push('<tr>');
    columns.forEach(col => {
      parts.push(`<th>${col}</th>`);
    });
    parts.push('</tr>');
    parts.push('</thead>');
    parts.push('<tbody>');
    wmsLayerNames.forEach((layerName, idx) => {
      parts.push('<tr>');
      let layerTitle = wmsLayerTitles[idx];
      let layerAbstract = wmsLayerAbstracts[idx];
      let layerMetadataUrl = wmsLayerMetadataURLs[idx];
      parts.push(`<td>${valOrFallback(layerName)}</td>`);
      parts.push(`<td>${valOrFallback(layerTitle)}</td>`);
      parts.push(`<td>${valOrFallback(layerAbstract)}</td>`);
      if (!layerMetadataUrl) {
        parts.push('<td>—</td>');
      } else {
        let linkTitle = `Link to the metadata-document of layer ${layerName}`;
        let linkText = 'Link to Metadata-document';
        parts.push(`<td><a href="${layerMetadataUrl}" title="${linkTitle}">${linkText}</a></td>`);
      }
      parts.push('</tr>');
    });
    parts.push('</tbody>');
    parts.push('</table>');
    if (serviceAbstract || serviceKeywords.length > 0 || topLevelLayerAbstract || topLevelLayerTitle) {
      parts.push('<dl>');
      parts.push(dlEntry('Abstract of service', serviceAbstract));
      parts.push(dlEntry('Keywords of service', toUnorderedList(serviceKeywords)));
      parts.push(dlEntry('Title of top-level layer', topLevelLayerTitle));
      parts.push(dlEntry('Abstract of top-level layer', topLevelLayerAbstract));
      parts.push('</dl>');
    }
    parts.push('</section>');
  });

  parts.push('</section>');
  return parts.join('');
};

const describeMapAndUpdateInfo = async () => {
  const description = await describe(
    map, {
      viewDescriber: null,
      textualDescriber: myTextualDescriber,
      updateAriaDescription: false
    });
  if (descElem) {
    descElem.innerHTML = description.text;
    map.getTargetElement().setAttribute('aria-describedby', descElem.id);
  }
  const highlighted = hljs.highlight(
    JSON.stringify(description, undefined, '  '),
    {language: 'json'}
  ).value;

  (descElem as HTMLDivElement).innerHTML = description.text;
  (rawElem as HTMLDivElement).innerHTML = highlighted;
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
