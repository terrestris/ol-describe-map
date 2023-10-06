import Layer from 'ol/layer/Layer';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

import { LayerDescriberFunc, LayerDescription, VectorLayerDetails } from './types';
import { determineLayerType } from './determineLayerType';
import { determineSourceType } from './determineSourceType';
import { getNameAttribute, simpleStats } from './util';

/**
 * Returns a basic description of the passed layer.
 *
 * @param layer Layer A layer to describe.
 * @returns LayerDescription A description of the layer.
 */
export const defaultLayerDescriber: LayerDescriberFunc = async (layer: Layer, view: View) => {
  const layerType = determineLayerType(layer);
  const source = layer.getSource();
  const sourceType = source == null ? 'unknown' : determineSourceType(source);
  let details = null;
  if (sourceType === 'Vector') {
    details = determineVectorLayerDetails(layer as VectorLayer<VectorSource>, view);
  }
  let desc: LayerDescription = {
    type: layerType,
    source: sourceType,
    details: details
  };
  return desc;
};

/**
 * Determines details for the passed vector layer and current Map view.
 * @param layer
 * @param view
 * @returns
 */
const determineVectorLayerDetails = (layer: VectorLayer<VectorSource>, view: View): VectorLayerDetails => {
  let details: VectorLayerDetails = {};
  const source = layer.getSource() as VectorSource;
  const extent = view.calculateExtent();
  const totalFeatures = source.getFeatures();

  if (totalFeatures.length === 0) {
    details.numTotalFeaturesInSource = 0;
    details.numFeaturesInExtent = 0;
    details.numRenderedFeaturesInExtent = 0;
    details.numSkippedFeaturesInExtent = 0;
    return details;
  }
  const extentFeatures = source.getFeaturesInExtent(extent);
  const numTotalFeatures = totalFeatures.length;
  const numExtentFeatures = extentFeatures.length;
  const res = view.getResolution();
  const styleFunc = layer.getStyleFunction();

  let renderedFeatures: Feature[] = [];
  let skippedFeatures: Feature[] = [];
  if (styleFunc !== undefined && res !== undefined) {
    extentFeatures.forEach(feature => {
      let styles = styleFunc(feature, res);
      if (styles === undefined) {
        skippedFeatures.push(feature);
      } else {
        renderedFeatures.push(feature);
      }
    });
  }

  details.numTotalFeaturesInSource = numTotalFeatures;
  details.numFeaturesInExtent = numExtentFeatures;
  details.numRenderedFeaturesInExtent = renderedFeatures.length;
  details.numSkippedFeaturesInExtent = skippedFeatures.length;

  let keys: string[]|undefined = undefined;
  let renderedData: object[] = [];
  let statsKeys: string[] = [];
  renderedFeatures.forEach((renderedFeat: Feature) => {
    const featureProps = renderedFeat.getProperties();
    delete featureProps.geometry;
    if (keys === undefined) {
      keys = Object.keys(featureProps);
      for (const key of keys) {
        if (typeof featureProps[key] === 'number') {
          statsKeys.push(key);
        }
      }
    }
    renderedData.push(featureProps);
  });
  let nameAttribute = getNameAttribute(renderedFeatures[0]);
  details.renderedStatistics = simpleStats(renderedData, statsKeys, nameAttribute);
  return details;
};

export default defaultLayerDescriber;
