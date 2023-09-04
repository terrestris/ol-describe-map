import Layer from 'ol/layer/Layer';
import BaseImageLayer from 'ol/layer/BaseImage';
import BaseTileLayer from 'ol/layer/BaseTile';
import BaseVectorLayer from 'ol/layer/BaseVector';

export const determineLayerType = (layer: Layer): string => {
  let layerType = 'unknown';

  if (layer instanceof BaseImageLayer) {
    layerType = 'image-layer (server-rendered & for arbitrary extents and resolutions)';
  } else if (layer instanceof BaseTileLayer) {
    layerType = 'tile-layer (pre-rendered, tiled images in grids organized by zoom levels)';
  } else if (layer instanceof BaseVectorLayer) {
    layerType = 'vector-layer (vector data that is rendered client-side)';
  }

  return layerType;
};
