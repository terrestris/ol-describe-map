import { LayerDescription } from './types';
import { startsWithVowel, stringifyNumber } from './util';

export const layerDescriptionsToText = (layerDescs: LayerDescription[]): string[] => {
  let parts: string[] = [];
  let pluralS = layerDescs.length !== 1 ? 's' : '';
  parts.push(`The map contains ${layerDescs.length} layer${pluralS}. `);

  layerDescs.forEach((layerDesc, idx) => {
    let n1 = startsWithVowel(layerDesc.type) ? 'n' : '';
    let n2 = startsWithVowel(layerDesc.source) ? 'n' : '';
    parts.push(`The ${stringifyNumber(idx + 1)} layer is a${n1} ${layerDesc.type}-layer. `);
    parts.push();
    parts.push(`It uses a${n2} ${layerDesc.source}-source as source for it's data. `);
    if (idx === 0 && layerDescs.length > 1) {
      parts.push('This layer is the lowest in the drawing order, other layers are drawn atop of it. ');
    }
    if (idx === layerDescs.length - 1) {
      parts.push('This layer is top-most in the drawing order.');
    }
  });
  return parts;
};

