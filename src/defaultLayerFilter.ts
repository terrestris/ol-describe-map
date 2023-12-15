import { LayerFilterFunc } from './types';

/**
 * A basic layer filter, which filters nothing and returns true for any passed layer.
 *
 * @returns boolean Always true.
 */
export const defaultLayerFilter: LayerFilterFunc = () => true;

export default defaultLayerFilter;
