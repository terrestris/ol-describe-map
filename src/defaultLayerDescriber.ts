import Layer from 'ol/layer/Layer';
import { LayerDescriberFunc, LayerDescription } from './types';
import { determineLayerType } from './determineLayerType';
import { determineSourceType } from './determineSourceType';

/**
 * Returns a basic description of the passed layer.
 *
 * @param layer Layer A layer to describe.
 * @returns LayerDescription A description of the layer.
 */
export const defaultLayerDescriber: LayerDescriberFunc = async (layer: Layer) => {
  const layerType = determineLayerType(layer);
  const source = layer.getSource();
  const sourceType = source == null ? 'unknown' : determineSourceType(source);
  let desc: LayerDescription = {
    type: layerType,
    source: sourceType,
    details: null
  };
  return desc;
};

export default defaultLayerDescriber;
