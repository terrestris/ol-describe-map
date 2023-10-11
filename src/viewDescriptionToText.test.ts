import Map from 'ol/Map';
import View from 'ol/View';

import { ViewDescription } from './types';
import {
  viewDescriptionToText
} from './viewDescriptionToText';
import defaultViewDescriber from './defaultViewDescriber';

let map: Map;
let div: HTMLDivElement;

describe('viewDescriptionToText', () => {
  beforeEach(() =>  {
    div = document.createElement('div');
    document.body.appendChild(div);
    map = new Map({
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      target: div
    });
  });
  afterEach(() => {
    map.dispose();
    div.parentNode?.removeChild(div);
  });

  test('describes rotation when not rotated', async () => {
    let viewDesc: ViewDescription = await defaultViewDescriber(map.getView());
    let got = viewDescriptionToText(viewDesc);
    let text = got.join('');
    expect(text).toMatch(/is not rotated/);
  });

  test('describes rotation when rotated clockwise, 90°', async () => {
    map.getView().setRotation(Math.PI/2);
    let viewDesc: ViewDescription = await defaultViewDescriber(map.getView());
    let got = viewDescriptionToText(viewDesc);
    let text = got.join('');
    expect(text).toMatch(/north is at the right-hand side/);
  });

  test('describes rotation when rotated counter-clockwise, -90°', async () => {
    map.getView().setRotation(-Math.PI/2);
    let viewDesc: ViewDescription = await defaultViewDescriber(map.getView());
    let got = viewDescriptionToText(viewDesc);
    let text = got.join('');
    expect(text).toMatch(/north is at the left-hand side/);
  });
  test('describes rotation when rotated by 180°', async () => {
    map.getView().setRotation(Math.PI);
    let viewDesc: ViewDescription = await defaultViewDescriber(map.getView());
    let got = viewDescriptionToText(viewDesc);
    let text = got.join('');
    expect(text).toMatch(/north is at the bottom/);
  });
  test('describes rotation when rotated by any other amount', async () => {
    map.getView().setRotation(Math.PI/4); // 45°
    let viewDesc: ViewDescription = await defaultViewDescriber(map.getView());
    let got = viewDescriptionToText(viewDesc);
    let text = got.join('');
    expect(text).toMatch(/roughly 45 degrees/);
  });
  test('it always uses the lowest correct deegree value when higher than 360°', async () => {
    map.getView().setRotation((Math.PI * 2) + Math.PI/4); // 405° => 45°
    let viewDesc: ViewDescription = await defaultViewDescriber(map.getView());
    let got = viewDescriptionToText(viewDesc);
    let text = got.join('');
    expect(text).toMatch(/roughly 45 degrees/);
  });
  test('it always uses the lowest correct deegree value when higher than 360°', async () => {
    map.getView().setRotation(Math.PI + Math.PI/2); // 270° => -90°
    let viewDesc: ViewDescription = await defaultViewDescriber(map.getView());
    let got = viewDescriptionToText(viewDesc);
    let text = got.join('');
    expect(text).toMatch(/north is at the left-hand side/);
  });
});
