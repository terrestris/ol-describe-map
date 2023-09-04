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
    center = [0, 0],
    rotation = 0,
    projection = '',
    epsg4326 = {}
  } = viewDesc;

  let viewProjIsNotEpsg4326 = viewDesc.projection !== 'EPSG:4326';

  if (epsg4326.center) {
    parts.push(
      'This map is currently centered at the following latitude and ' +
      `longitude coordinate ${formatCoordinate(...epsg4326.center)}. `
    );
  }
  if (projection) {
    parts.push(`The map projection that is used in the map has the code ${viewDesc.projection}. `);
  }
  if (viewProjIsNotEpsg4326) {
    parts.push(`Expressed in units of the used map-projection the center is at ${formatCoordinate(...center)}. `);
  }

  if (epsg4326.bbox) {
    parts.push(`The view has an extent of ${formatBBOX(epsg4326.bbox || [])} (latitude/longitude) `);
    parts.push(`i.e. the lower left point is at ${formatCoordinate(epsg4326.bbox?.[0], epsg4326.bbox?.[1])}`);
    parts.push(`, the upper right is at ${formatCoordinate(epsg4326.bbox?.[2], epsg4326.bbox?.[3])}. `);
  }

  if (viewProjIsNotEpsg4326 && viewDesc.bbox && projection) {
    parts.push(
      `Since the map uses ${projection} as projection, ` +
      `the extent is actually ${formatBBOX(viewDesc.bbox || [])}. `
    );
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
