import Map from 'ol/Map';
import { DescribeConfiguration } from './types';
/**
 * Describes the passed map according to the passed configuration and returns that
 * description.
 *
 * @param map Map An OpenLayers Map you want to have a description for.
 * @param conf DescribeConfiguration A configuration how you want the
 *   map to be described.
 * @returns MapDescription A map description object.
 */
export declare function describe(map: Map, conf?: DescribeConfiguration): Promise<{
    text: string;
    view: import("./types").ViewDescription;
    layers: import("./types").LayerDescription[];
}>;
