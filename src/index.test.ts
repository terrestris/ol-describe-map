import { View } from 'ol';
import { describe as describeOlMap } from '.';

import Map from 'ol/Map';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';

const makeLayer = (): Layer => {
  let source = new Source({});
  return new Layer({source});
};

let map;

describe('describe function', () => {
  beforeEach(() =>  {
    map = new Map({
      layers: [
        makeLayer(),
        makeLayer()
      ],
      view: new View({
        center: [0, 0],
        resolution: 1,
        rotation: -Math.PI/4
      })
    });
  });
  afterEach(() => {
    map = null;
  });

  test('basic functionality', async () => {
    let description = await describeOlMap(map);
    expect(description.text).not.toBe('');
    expect(description.view?.bbox).toBeInstanceOf(Array);
    expect(description.view?.projection).toStrictEqual('EPSG:3857');
    expect(description.layers?.length).not.toBe(0);
  });
  describe('default describers', () => {
    test('default textual description', async () => {
      let description = await describeOlMap(map);
      expect(description.text).toContain('coordinate [0, 0]');
      expect(description.text).toContain('EPSG:3857');
      expect(description.text).toContain('counter-clockwise');
      expect(description.text).toContain('first');
      expect(description.text).toContain('second');
      expect(description.text).toContain('top-most');
    });
    test('default view description', async () => {
      let expectedBbox = map.getView().calculateExtent();
      let expectedProj = map.getView().getProjection().getCode();
      let description = await describeOlMap(map);
      expect(description.view?.bbox).toStrictEqual(expectedBbox);
      expect(description.view?.projection).toStrictEqual(expectedProj);
    });
    test('default layer description', async () => {
      let description = await describeOlMap(map);
      const expectedLen = map.getAllLayers().length;
      expect(description.layers?.length).toBe(expectedLen);
      expect(description.layers?.[0].type).toStrictEqual('unknown');
    });
  });
});

