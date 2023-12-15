import Map from 'ol/Map';

import {
  DescribeConfiguration,
  LayerDescriberFunc,
  ViewDescriberFunc
} from './types';

import defaultLayerFilter from './defaultLayerFilter';
import defaultViewDescriber from './defaultViewDescriber';
import defaultLayerDescriber from './defaultLayerDescriber';
import defaultTextualDescriber from './defaultTextualDescriber';
import { voidLayersDescriber, voidViewDescriber } from './util';

/**
 * Describes the passed map according to the passed configuration and returns that
 * description. By default also the 'aria-description' attribute of the map's DOM
 * element is updated.
 *
 * @param map Map An OpenLayers Map you want to have a description for.
 * @param conf DescribeConfiguration A configuration how you want the
 *   map to be described and whether the 'aria-description' in the DOM
 *   should directly be updated.
 * @returns MapDescription A map description object.
 */
export async function describe(map: Map, conf: DescribeConfiguration = {}) {
  let finalViewDescriber: ViewDescriberFunc;
  let finalLayerDescriber: LayerDescriberFunc;

  const {
    layerFilter = defaultLayerFilter,
    viewDescriber = defaultViewDescriber,
    layerDescriber = defaultLayerDescriber,
    textualDescriber = defaultTextualDescriber,
    updateAriaDescription = true
  } = conf;

  if (viewDescriber == null) {
    finalViewDescriber = voidViewDescriber;
  } else {
    finalViewDescriber = viewDescriber;
  }
  if (layerDescriber == null) {
    finalLayerDescriber = voidLayersDescriber;
  } else {
    finalLayerDescriber = layerDescriber;
  }

  const view = map.getView();
  let layers = map.getAllLayers().filter(layerFilter);
  let viewDescription = await finalViewDescriber(view);
  let layerDescriptions = await Promise.all(layers.map(async (layer) => {
    return await finalLayerDescriber(layer, view);
  }));
  let textualDescription = await textualDescriber(viewDescription, layerDescriptions);

  const targetElement = map.getTargetElement();
  if (updateAriaDescription && targetElement) {
    targetElement.setAttribute('aria-description', textualDescription);
  }

  return {
    text: textualDescription,
    view: viewDescription,
    layers: layerDescriptions
  };
};
