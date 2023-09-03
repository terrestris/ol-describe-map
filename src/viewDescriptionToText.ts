import { ViewDescription } from './types';

const rad2deg = (rad: number = 0): number => rad * (180/Math.PI);

// https://stackoverflow.com/a/18358056
const roundTo = (num: number, digits: number = 4): number => {
  let a = `${num}e+${digits}`;
  let b = `e-${digits}`;
  return +(Math.round(+a) + b);
};

const formatCoordinate = (x: number = 0, y: number = 0, digits = 4): string => {
  return `[${roundTo(x, digits)}, ${roundTo(y, digits)}]`;
};

const formatBBOX = (coords: number[], digits = 4): string => {
  return [
    '[',
    `${roundTo(coords[0], digits)}, ${roundTo(coords[1], digits)}, `,
    `${roundTo(coords[2], digits)}, ${roundTo(coords[3], digits)}`,
    ']'
  ].join('');
};

export const viewDescriptionToText = (viewDesc: ViewDescription): string[] => {
  let parts: string[] = [];

  if (viewDesc.center) {
    parts.push(`This map is currently centered at the coordinate ${formatCoordinate(...viewDesc.center)}. `);
  }
  if (viewDesc.projection) {
    parts.push(`The map projection that is used in the map has the code ${viewDesc.projection}. `);
  }
  if (viewDesc.bbox) {
    parts.push(`The view has an extent of ${formatBBOX(viewDesc.bbox || [])} `);
    parts.push(`i.e. the lower left point is at ${formatCoordinate(viewDesc.bbox?.[0], viewDesc.bbox?.[1])}`);
    parts.push(`, the upper right is at ${formatCoordinate(viewDesc.bbox?.[2], viewDesc.bbox?.[3])}. `);
  }
  if (viewDesc.rotation === 0) {
    parts.push('This map is not rotated, north is at the top. ');
  } else if (viewDesc?.rotation !== undefined) {
    let direction = viewDesc?.rotation > 0 ? 'clockwise' : 'counter-clockwise';
    let absDegrees = rad2deg(Math.abs(viewDesc.rotation));
    parts.push(`This map is rotated ${direction} by ${roundTo(absDegrees, 2)} degrees. `);
  }
  if (viewDesc.scale) {
    parts.push(`The map has a scale of roughly 1:${roundTo(viewDesc.scale, 0)}. `);
  }
  if (viewDesc.zoom) {
    parts.push(`Currently the map is zoomed to level ${roundTo(viewDesc.zoom, 2)}.`);
  }


  return parts;
};
