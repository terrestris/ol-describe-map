import { ViewDescription } from './types';
import {
  formatBBOX,
  formatCoordinate,
  rad2deg,
  roundTo
} from './util';


const rotationToText = (rotation: number) => {
  let absDegrees = rad2deg(Math.abs(rotation));
  let isRotated = 'This map is rotated';
  let direction = rotation > 0 ? 'clockwise' : 'counter-clockwise';
  let rightLeft = rotation > 0 ? 'right' : 'left';

  if (absDegrees % 360 === 0) {
    return 'This map is not rotated, north is at the top. ';
  } else if (absDegrees % 180 === 0) {
    return `${isRotated}: North is at the bottom of the map. `;
  } else if (absDegrees % 270 === 0 || absDegrees % 90 === 0) {
    return `${isRotated}; North is at the ${rightLeft}-hand side of the map. `;
  }

  return `${isRotated} ${direction} by roughly ${roundTo(absDegrees, 2)} degrees. `;
};


export const viewDescriptionToText = (viewDesc: ViewDescription): string[] => {
  let parts: string[] = [];

  const {
    rotation = 0,
    viewProjection = '',
    epsg4326 = {}
  } = viewDesc;

  if (epsg4326.center) {
    parts.push(
      'This map is currently centered at the following latitude and ' +
      `longitude coordinate ${formatCoordinate(...epsg4326.center)}. `
    );
  }
  if (viewProjection) {
    parts.push(`The map projection that is used in the map has the code ${viewProjection}. `);
  }

  if (epsg4326.bbox) {
    parts.push(`The view has an extent of ${formatBBOX(epsg4326.bbox || [])} (latitude/longitude) `);
    parts.push(`i.e. the lower left point is at ${formatCoordinate(epsg4326.bbox?.[0], epsg4326.bbox?.[1])}`);
    parts.push(`, the upper right is at ${formatCoordinate(epsg4326.bbox?.[2], epsg4326.bbox?.[3])}. `);
  }

  parts.push(rotationToText(rotation));

  if (viewDesc.scale) {
    parts.push(`The map has a scale of roughly 1:${roundTo(viewDesc.scale, 0).toLocaleString('en-GB')}. `);
  }
  if (viewDesc.zoom) {
    parts.push(`Currently the map is zoomed to level ${roundTo(viewDesc.zoom, 2)}.`);
  }


  return parts;
};
