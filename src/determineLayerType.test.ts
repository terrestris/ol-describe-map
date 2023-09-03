import { determineLayerType } from './determineLayerType';

import Layer from 'ol/layer/Layer';
import BaseImageLayer from 'ol/layer/BaseImage';
import BaseTileLayer from 'ol/layer/BaseTile';
import BaseVectorLayer from 'ol/layer/BaseVector';

describe('determineLayerType', () => {
  test('detects BaseImageLayer', () => {
    const layer = new BaseImageLayer();
    const detected = determineLayerType(layer);
    expect(detected).toMatch(/image/gi);
  });
  test('detects BaseTileLayer', () => {
    const layer = new BaseTileLayer();
    const detected = determineLayerType(layer);
    expect(detected).toMatch(/tile/gi);
  });
  test('detects BaseVectorLayer', () => {
    const layer = new BaseVectorLayer();
    const detected = determineLayerType(layer);
    expect(detected).toMatch(/vector/gi);
  });
  test('has unknown as fallback', () => {
    const layer = new Layer({});
    const detected = determineLayerType(layer);
    expect(detected).toStrictEqual('unknown');
  });
});
