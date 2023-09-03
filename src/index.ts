import Map from 'ol/Map';

import {
  DescribeConfiguration
} from './types';

import defaultLayerFilter from './defaultLayerFilter';
import defaultViewDescriber from './defaultViewDescriber';
import defaultLayerDescriber from './defaultLayerDescriber';
import defaultTextualDescriber from './defaultTextualDescriber';

/**
 * Describes the passed map according to the passed configuration and returns that
 * description.
 *
 * @param map Map An OpenLayers Map you want to have a description for.
 * @param conf DescribeConfiguration A configuration how you want the
 *   map to be described.
 * @returns MapDescription A map description object.
 */
export async function describe(map: Map, conf: DescribeConfiguration = {}) {
  const {
    layerFilter = defaultLayerFilter,
    viewDescriber = defaultViewDescriber,
    layerDescriber = defaultLayerDescriber,
    textualDescriber = defaultTextualDescriber
  } = conf;

  let layers = map.getAllLayers().filter(layerFilter);
  let viewDescription = await viewDescriber(map.getView());
  let layerDescriptions = await Promise.all(layers.map(async (layer) => {
    return await layerDescriber(layer);
  }));
  let textualDescription = await textualDescriber(viewDescription, layerDescriptions);

  return {
    text: textualDescription,
    view: viewDescription,
    layers: layerDescriptions
  };
};
