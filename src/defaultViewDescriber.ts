import { View } from 'ol';
import { ViewDescriberFunc } from './types';
import { METERS_PER_UNIT, Projection, get, getUserProjection, transform } from 'ol/proj';
import { Units } from 'ol/proj/Units';
import { Extent } from 'ol/extent';

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


const get4326Coordinates = (bbox: number[], center: number[], proj: Projection) => {
  const epsg4326 = get('EPSG:4326');
  if (epsg4326 === null || proj.getCode() === epsg4326?.getCode()) {
    return {
      bbox,
      center
    };
  }
  let ll = [bbox[0], bbox[1]];
  let ur = [bbox[2], bbox[3]];
  return {
    bbox: [...transform(ll, proj, epsg4326), ...transform(ur, proj, epsg4326)],
    center: transform(center, proj, epsg4326)
  };
};


/**
 * A basic view describer.
 *
 * @param view View An OpenLayers view to describe.
 * @returns ViewDescription A description of the view.
 */
export const defaultViewDescriber: ViewDescriberFunc = async (view: View) => {
  const bbox = view.calculateExtent() as Extent;
  const center = view.getCenter() as number[];
  const viewProjection = view.getProjection();
  const userProjection = getUserProjection();

  // viewProjection isn't necessarily the projection of the center and bbox coordinates,
  // because a user might have set a userProjection (e.g. via useGeographic())
  // and in that case the bbox and the center would already be in the userProjection
  const epsg4326 = get4326Coordinates(bbox, center, userProjection || viewProjection);
  let viewDesc = {
    bbox,
    center,
    viewProjection: viewProjection ? viewProjection.getCode() : undefined,
    userProjection: userProjection ? userProjection.getCode() : undefined,
    rotation: view.getRotation(),
    zoom: view.getZoom(),
    scale: calculateScale(view),
    epsg4326
  };
  return viewDesc;
};

export default defaultViewDescriber;
