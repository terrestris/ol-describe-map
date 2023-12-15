import Feature from 'ol/Feature';
import Layer from 'ol/layer/Layer';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import WMSCapabilities from 'ol/format/WMSCapabilities.js';

import {
  CapaLayer,
  LayerDescriberFunc,
  LayerDescription,
  MetadataURLObject,
  VectorLayerDetails,
  WMSLayerDetails
} from './types';
import { determineLayerType } from './determineLayerType';
import { determineSourceType } from './determineSourceType';
import {
  getNameAttribute,
  getWmsResponse as getPossiblyCachedWmsResponse,
  simpleStats
} from './util';


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
  let details: WMSLayerDetails | VectorLayerDetails | null = null;
  if (sourceType === 'Vector') {
    details = determineVectorLayerDetails(layer as VectorLayer<VectorSource>, view);
  }
  if (sourceType === 'TileWMS') {
    details = await determineWmsLayerDetails(layer as TileLayer<TileWMS>);
  }
  if (sourceType === 'ImageWMS') {
    details = await determineWmsLayerDetails(layer as ImageLayer<ImageWMS>);
  }
  let desc: LayerDescription = {
    type: layerType,
    source: sourceType,
    details: details
  };
  return desc;
};

/**
 *
 * @param layer
 * @returns
 */
const determineWmsLayerDetails = async (layer: TileLayer<TileWMS> | ImageLayer<ImageWMS>): Promise<WMSLayerDetails> => {
  const parser = new WMSCapabilities();
  let details: WMSLayerDetails = {};
  const source = layer.getSource();
  if (source == null) {
    return details;
  }
  const params = source.getParams();
  let urls;
  if (source instanceof TileWMS) {
    urls = source.getUrls();
  } else if (source instanceof ImageWMS) {
    urls = [source.getUrl()];
  }

  let url = urls && urls[0] ? urls[0] : '';
  if (!url) {
    return details;
  }

  let responseTxt = await getPossiblyCachedWmsResponse(url, {
    VERSION: params.VERSION || '1.3.0',
    SERVICE: params.SERVICE || 'WMS',
    REQUEST: 'GetCapabilities'
  });

  let json = parser.read(responseTxt);

  // add service information
  details.serviceAbstract = json?.Service?.Abstract;
  details.serviceKeywords = json?.Service?.KeywordList;
  details.serviceTitle = json?.Service?.Title;

  // add outermost/embracing layer information
  details.topLevelLayerAbstract = json?.Capability?.Layer?.Abstract;
  details.topLevelLayerTitle = json?.Capability?.Layer?.Title;

  // add actual layer information, there might be multiple (LAYERS=foo,bar)
  let actualLayers = findLayersByLayerNames(json?.Capability?.Layer, params.LAYERS);
  details.wmsLayerNames = [];
  details.wmsLayerAbstracts = [];
  details.wmsLayerTitles = [];
  details.wmsLayerMetadataURLs = [];

  actualLayers.forEach((actualLayer: CapaLayer) => {
    details.wmsLayerNames?.push(actualLayer?.Name || '');
    details.wmsLayerAbstracts?.push(actualLayer?.Abstract || '');
    details.wmsLayerTitles?.push(actualLayer?.Title || '');
    details.wmsLayerMetadataURLs?.push(findBestMetadataURL(actualLayer));
  });

  return details;
};

/**
 *
 * @param layerCapabilities
 * @returns
 */
const findBestMetadataURL = (layerCapabilities: CapaLayer) => {
  let allURLObjects: MetadataURLObject[] = layerCapabilities?.MetadataURL || [];
  let preferredFormats = ['text/html', 'html', 'text/xml', 'xml'];

  let bestUrl = '';
  let bestScore = -Infinity;
  allURLObjects.forEach((oneUrlObj: any) => {
    let currFormat = oneUrlObj.Format;
    let currURL = oneUrlObj.OnlineResource;
    let indexOfCurrFormat = preferredFormats.findIndex(entry => entry === currFormat);
    let currScore = indexOfCurrFormat < 0
      ? indexOfCurrFormat
      : preferredFormats.length - indexOfCurrFormat;

    if (currScore > bestScore) {
      bestUrl = currURL;
      bestScore = currScore;
    }
  });
  return bestUrl;
};

/**
 *
 * @param capabilityLayer
 * @param layersParam
 * @returns
 */
const findLayersByLayerNames = (capabilityLayer: any, layersParam: string, addTo = []): object[] => {
  let layerNames = (layersParam || '').split(',');
  let jsonLayers: Array<any> = capabilityLayer?.Layer;
  let found: any = addTo;
  jsonLayers.forEach(jsonLayer => {
    if (layerNames.includes(jsonLayer.Name)) {
      found.push(jsonLayer);
    }
    if (jsonLayer.Layer) {
      found = findLayersByLayerNames(jsonLayer, layersParam, found);
    }
  });

  return found;
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
