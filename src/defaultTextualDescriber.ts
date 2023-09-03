import { layerDescriptionsToText } from './layerDescriptionsToText';
import {
  LayerDescription,
  TextualDescriberFunc,
  ViewDescription
} from './types';
import { viewDescriptionToText } from './viewDescriptionToText';

/**
 * Returns a basic description based on the view description and any layer
 * descriptions.
 *
 * @param viewDesc ViewDescription A view description.
 * @param layerDescs LayerDescription[] An array of layer descriptions.
 * @returns string A textual description.
 */
export const defaultTextualDescriber: TextualDescriberFunc =
async (viewDesc?: ViewDescription, layerDescs?: LayerDescription[]) => {
  let parts: string[] = [];
  if (viewDesc !== undefined) {
    parts.push(
      ...viewDescriptionToText(viewDesc), ' '
    );
  }
  if (layerDescs !== undefined) {
    parts.push(
      ...layerDescriptionsToText(layerDescs)
    );
  }

  return parts.join('');
};

export default defaultTextualDescriber;
