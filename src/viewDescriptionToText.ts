import { ViewDescription } from './types';
import {
  formatBBOX,
  formatCoordinate,
  rad2deg,
  roundTo
} from './util';

/**
 * Converts a rotation in radians to a descriptive sentence.
 *
 * @param {number} rotation - The rotation angle in radians to describe.
 * @returns {string} A descriptive sentence based on the rotation angle.
 */
const rotationToText = (rotation: number) => {
  // Constants for circle and direction angles
  const CIRCLE_DEGREES = 360;
  const HALF_CIRCLE_DEGREES = 180;
  const UP_DEGREES = 0;
  const RIGHT_DEGREES = 90;
  const DOWN_DEGREES = 180;
  const LEFT_DEGREES = 270;

  // reusable text for rotated map
  const isRotated = 'This map is rotated';

  // Convert to degrees and ensure it is within [0, 360) range
  let degrees = rad2deg(rotation) % CIRCLE_DEGREES;
  if (degrees < 0) {
    degrees = CIRCLE_DEGREES + degrees;
  }

  // Handle special cases for cardinal directions
  if (degrees === UP_DEGREES) {
    return 'This map is not rotated, north is at the top. ';
  } else if (degrees === RIGHT_DEGREES) {
    return `${isRotated}, north is at the right-hand side. `;
  } else if (degrees === DOWN_DEGREES) {
    return `${isRotated}, north is at the bottom. `;
  } else if (degrees === LEFT_DEGREES) {
    return `${isRotated}, north is at the left-hand side. `;
  }

  // Determine the rotation direction and describe it
  let direction = 'clockwise';
  if (degrees > HALF_CIRCLE_DEGREES) {
    degrees = CIRCLE_DEGREES - degrees;
    direction = 'counter-clockwise';
  }

  // Return the description including the direction and rounded degrees
  return `${isRotated} ${direction} by roughly ${roundTo(degrees, 2)} degrees. `;
};

/**
 * Converts a description of the view to a bunch of descriptive sentences.
 *
 * @param {ViewDescription} viewDesc - an object describing various aspects of the view.
 * @returns {string[]} A bunch of descriptive sentences based on the passed apects of
 *   the view.
 */
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

  if (viewDesc.rotation !== undefined) {
    parts.push(rotationToText(rotation));
  }

  if (viewDesc.scale) {
    parts.push(`The map has a scale of roughly 1:${roundTo(viewDesc.scale, 0).toLocaleString('en-GB')}. `);
  }
  if (viewDesc.zoom) {
    parts.push(`Currently the map is zoomed to level ${roundTo(viewDesc.zoom, 2)}.`);
  }


  return parts;
};
