import Layer from 'ol/layer/Layer';
import BaseImageLayer from 'ol/layer/BaseImage';
import BaseTileLayer from 'ol/layer/BaseTile';
import BaseVectorLayer from 'ol/layer/BaseVector';

export const determineLayerType = (layer: Layer): string => {
  let layerType = 'unknown';

  if (layer instanceof BaseImageLayer) {
    layerType = 'image (server-rendered & for arbitrary extents and resolutions)';
  } else if (layer instanceof BaseTileLayer) {
    layerType = 'tile (pre-rendered, tiled images in grids organized by zoom levels)';
  } else if (layer instanceof BaseVectorLayer) {
    layerType = 'vector (vector data that is rendered client-side)';
  }

  return layerType;
};


// ol​/layer​/BaseTile
// ol​/layer​/BaseImage
// ol​/layer​/WebGLTile
// ol​/layer​/Graticule
// ol​/layer​/Graticule
// ol​/layer​/WebGLTile
// ol​/layer​/BaseVector
// ol​/layer​/VectorTile
// ol​/layer​/VectorTile
// ol​/layer​/VectorImage
