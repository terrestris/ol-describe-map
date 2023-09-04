import { layerDescriptionsToText } from './layerDescriptionsToText';
import {
  LayerDescription,
  TextualDescriberFunc,
  ViewDescription
} from './types';

import { roundTo } from './util';

const reverseGeocode = async (lon = 0, lat = 0, zoom = 0): Promise<string | null> => {
  let result = null;
  const nominatimUrl = 'https://nominatim.terrestris.de/reverse.php';
  const resp = await fetch(nominatimUrl + '?' + new URLSearchParams({
    lon: `${roundTo(lon, 5)}`,
    lat: `${roundTo(lat, 5)}`,
    zoom: `${Math.round(zoom)}`,
    format: 'jsonv2'
  }));
  const data = await resp.json();
  if (!data.error) {
    result = data.display_name;
  }
  return result;
};

const fetchNominatimPlaces = async (viewDesc: ViewDescription) => {
  const {
    zoom = 0
  } = viewDesc;
  const center = viewDesc?.epsg4326?.center || [0, 0];
  const bbox = viewDesc?.epsg4326?.bbox || [0, 0, 0, 0];
  const places = [];

  let centerData = await reverseGeocode(center[0], center[1], zoom);
  let llData = await reverseGeocode(bbox[0], bbox[1], zoom);
  let ulData = await reverseGeocode(bbox[0], bbox[3], zoom);
  let urData = await reverseGeocode(bbox[2], bbox[3], zoom);
  let lrData = await reverseGeocode(bbox[2], bbox[1], zoom);

  if (centerData) {
    places.push(`The map is centered at ${centerData}.`);
  }
  if (llData) {
    places.push(`The lower left of the visible map extent is at ${llData}.`);
  }
  if (ulData) {
    places.push(`In the upper left corner of the visible extent, ${ulData} is located.`);
  }
  if (urData) {
    places.push(`${urData} is in the upper right corner of the map.`);
  }
  if (lrData) {
    places.push(`The lower right corner of the map shows ${lrData}.`);
  }

  if (centerData || llData || ulData || urData || lrData) {
    places.push(
      'Place determination uses a Nominatim service from terrestris' +
      ' – https://nominatim.terrestris.de/ –, based on data from the OpenStreetMap' +
      ' project, © OpenStreetMap contributors.'
    );
  }

  return places.join(' ');
};


/**
 * Returns a basic description based on the view description and any layer
 * descriptions.
 *
 * @param viewDesc ViewDescription A view description.
 * @param layerDescs LayerDescription[] An array of layer descriptions.
 * @returns string A textual description.
 */
export const nominatimTextualDescriber: TextualDescriberFunc =
async (viewDesc?: ViewDescription, layerDescs?: LayerDescription[]) => {
  let parts: string[] = [];

  if (viewDesc !== undefined) {
    parts.push(await fetchNominatimPlaces(viewDesc));
  }
  if (layerDescs !== undefined) {
    parts.push(
      ...layerDescriptionsToText(layerDescs)
    );
  }

  return parts.join('');
};

export default nominatimTextualDescriber;
