import { ViewDescription } from './types';
/**
 * Converts a description of the view to a bunch of descriptive sentences.
 *
 * @param {ViewDescription} viewDesc - an object describing various aspects of the view.
 * @returns {string[]} A bunch of descriptive sentences based on the passed apects of
 *   the view.
 */
export declare const viewDescriptionToText: (viewDesc: ViewDescription) => string[];
