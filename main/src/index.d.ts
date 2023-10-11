import Map from 'ol/Map';
import { DescribeConfiguration } from './types';
/**
 * Describes the passed map according to the passed configuration and returns that
 * description. By default also the 'aria-description' attribute of the map's DOM
 * element is updated.
 *
 * @param map Map An OpenLayers Map you want to have a description for.
 * @param conf DescribeConfiguration A configuration how you want the
 *   map to be described and whether the 'aria-description' in the DOM
 *   should directly be updated.
 * @returns MapDescription A map description object.
 */
export declare function describe(map: Map, conf?: DescribeConfiguration): Promise<{
    text: string;
    view: import("./types").ViewDescription;
    layers: import("./types").LayerDescription[];
}>;
