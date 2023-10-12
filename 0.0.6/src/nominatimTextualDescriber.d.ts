import { TextualDescriberFunc } from './types';
/**
 * Returns a basic description based on the view description and any layer
 * descriptions.
 *
 * @param viewDesc ViewDescription A view description.
 * @param layerDescs LayerDescription[] An array of layer descriptions.
 * @returns string A textual description.
 */
export declare const nominatimTextualDescriber: TextualDescriberFunc;
export default nominatimTextualDescriber;
