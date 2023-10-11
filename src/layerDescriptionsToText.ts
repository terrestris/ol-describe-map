import { LayerDescription } from './types';
import {
  localNum,
  makePercentInfo,
  startsWithVowel,
  stringifyNumber
} from './util';

/**
 *
 * @param layerDescs LayerDescription[] Desciptions of layers.
 * @returns string[]
 */
export const layerDescriptionsToText = (layerDescs: LayerDescription[]): string[] => {
  let parts: string[] = [];
  let pluralS = layerDescs.length !== 1 ? 's' : '';
  let andOnly = layerDescs.length === 1 ? ' and only ' : '';

  parts.push(`The map contains ${layerDescs.length} layer${pluralS}. `);

  layerDescs.forEach((layerDesc, idx) => {
    let n1 = startsWithVowel(layerDesc.type) ? 'n' : '';
    let n2 = startsWithVowel(layerDesc.source) ? 'n' : '';

    parts.push(`The ${stringifyNumber(idx + 1)}${andOnly} layer is a${n1} ${layerDesc.type}. `);
    parts.push();
    parts.push(`It uses a${n2} ${layerDesc.source}-source as source for it's data. `);
    // add vector details to textual description
    if (layerDesc.source === 'Vector') {
      parts = vectorLayersDetailsToText(layerDesc, parts);
    }
    if (idx === 0 && layerDescs.length > 1) {
      parts.push('This layer is the lowest in the drawing order, other layers are drawn atop of it. ');
    }
    if (idx === layerDescs.length - 1 && layerDescs.length !== 1) {
      parts.push('This layer is top-most in the drawing order.');
    }
  });
  return parts;
};

const vectorLayersDetailsToText = (layerDesc: LayerDescription, parts: string[]) => {
  if (layerDesc.details == null) {
    return parts;
  }
  const {
    numTotalFeaturesInSource: total,
    numFeaturesInExtent: inExtent = 0,
    numRenderedFeaturesInExtent: rendered = 0,
    renderedStatistics: renderStats = undefined
  } = layerDesc.details;
  const pluralSTotal = total === 1 ? '' : 's';
  const wereWas = rendered === 1 ? 'was' : 'were';
  const renderedPlurals = rendered === 1 ? '' : 's';
  parts.push(`The layer source contains ${localNum(total)} feature${pluralSTotal}. `);
  if (inExtent > 0) {
    const percentInExtent = makePercentInfo(inExtent, total);
    const percentRendered = makePercentInfo(rendered, inExtent);
    parts.push(`A total number of ${localNum(inExtent)}${percentInExtent} `);
    parts.push(`intersect with the current map-extent; actually rendered ${wereWas} `);
    parts.push(`${localNum(rendered)}${percentRendered} feature${renderedPlurals}. `);
  }
  if (renderStats) {
    const properties = Object.keys(renderStats);
    if (properties.length > 0) {
      const yOrIes = properties.length === 1 ? 'y' : 'ies';
      parts.push(`From the rendered feature${renderedPlurals} `);
      parts.push(`basic statistical information for the following propert${yOrIes} `);
      parts.push(`can be obtained: '${properties.join('\', \'')}'. `);
      properties.forEach(prop => {
        const stats = (renderStats as any)[prop];
        const minPlace = stats.minName ? ` (feature named '${stats.minName}')` : '';
        const maxPlace = stats.maxName ? ` (for the feature with name '${stats.maxName}')` : '';
        if (rendered > 1) {
          parts.push(`Property '${prop}': the minimal value is ${localNum(stats.min)}${minPlace} `);
          parts.push(`while the maximum value is ${localNum(stats.max)}${maxPlace}. The average `);
          parts.push(`value is ${localNum(stats.avg)} and the sum is ${localNum(stats.sum)}. `);
        } else {
          parts.push(`For the property ${prop} the value is ${localNum(stats.min)}${minPlace}. `);
        }
      });
    }
  }
  return parts;
};
