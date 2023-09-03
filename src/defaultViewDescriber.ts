import { View } from 'ol';
import {
  ViewDescriberFunc
} from './types';
import { METERS_PER_UNIT } from 'ol/proj';
import { Units } from 'ol/proj/Units';

const calculateScale = (view: View): number => {
  const unit: Units = view.getProjection().getUnits();
  const resolution: number = view.getResolution() || 1;
  const inchesPerMetre = 39.37;
  const dpi = 90;
  let mpu = 1;
  if (unit !== 'pixels' && unit !== 'tile-pixels') {
    mpu = METERS_PER_UNIT[unit];
  }
  return resolution * mpu * inchesPerMetre * dpi;
};


/**
 * A basic view describer.
 *
 * @param view View An OpenLayers view to describe.
 * @returns ViewDescription A description of the view.
 */
export const defaultViewDescriber: ViewDescriberFunc = async (view: View) => {
  let viewDesc = {
    bbox: view.calculateExtent() as number[],
    center: view.getCenter() as number[],
    projection: view.getProjection().getCode(),
    rotation: view.getRotation(),
    zoom: view.getZoom(),
    scale: calculateScale(view)
  };
  return viewDesc;
};

export default defaultViewDescriber;
