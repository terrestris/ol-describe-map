import { View, Map } from 'ol';
import defaultViewDescriber from './defaultViewDescriber';
import { transform, get, Projection, useGeographic } from 'ol/proj';

const epsg4326 = get('EPSG:4326') as Projection;
const epsg3857 = get('EPSG:3857') as Projection;
const amsterdamIn4326 = [4.890444, 52.370197];
const amsterdamIn3857 = transform([4.890444, 52.370197], epsg4326, epsg3857);

describe('defaultViewDescriber', () => {
  test('returns a correct view description', async () => {
    let map = new Map({
      layers: [],
      view: new View({
        center: amsterdamIn3857,
        resolution: 1
      })
    });

    let viewDescription = await defaultViewDescriber(map.getView());
    expect(viewDescription.center?.[0]).toBeCloseTo(amsterdamIn3857[0], 5);
    expect(viewDescription.center?.[1]).toBeCloseTo(amsterdamIn3857[1], 5);
    expect(viewDescription.epsg4326?.center?.[0]).toBeCloseTo(amsterdamIn4326[0], 5);
    expect(viewDescription.epsg4326?.center?.[1]).toBeCloseTo(amsterdamIn4326[1], 5);
  });

  test('cannot be tricked by useGeographic', async () => {
    useGeographic();
    let map = new Map({
      layers: [],
      view: new View({
        center: amsterdamIn4326,
        resolution: 1
      })
    });

    let viewDescription = await defaultViewDescriber(map.getView());

    expect(viewDescription.center?.[0]).toBeCloseTo(amsterdamIn4326[0], 5);
    expect(viewDescription.center?.[1]).toBeCloseTo(amsterdamIn4326[1], 5);

    expect(viewDescription.epsg4326?.center?.[0]).toBeCloseTo(amsterdamIn4326[0], 5);
    expect(viewDescription.epsg4326?.center?.[1]).toBeCloseTo(amsterdamIn4326[1], 5);
  });
});
