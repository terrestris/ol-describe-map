import View from 'ol/View';
import Layer from 'ol/layer/Layer';
export type ViewDescription = {
    bbox?: number[];
    center?: number[];
    viewProjection?: string;
    userProjection?: string;
    rotation?: number;
    scale?: number;
    zoom?: number;
    epsg4326?: {
        bbox?: number[];
        center?: number[];
    };
};
export type VectorLayerDetails = {
    numTotalFeaturesInSource?: number;
    numFeaturesInExtent?: number;
    numRenderedFeaturesInExtent?: number;
    numSkippedFeaturesInExtent?: number;
    renderedStatistics?: object;
};
export type LayerDescription = {
    type: string;
    source: string;
    details: VectorLayerDetails | null;
};
export type LayerFilterFunc = (layer: Layer) => boolean | undefined;
export type ViewDescriberFunc = (view: View) => Promise<ViewDescription>;
export type LayerDescriberFunc = (layer: Layer, view: View) => Promise<LayerDescription>;
export type TextualDescriberFunc = (viewDescription?: ViewDescription, layerDescriptions?: LayerDescription[]) => Promise<string>;
export type DescribeConfiguration = {
    layerFilter?: LayerFilterFunc;
    viewDescriber?: ViewDescriberFunc;
    layerDescriber?: LayerDescriberFunc;
    textualDescriber?: TextualDescriberFunc;
    updateAriaDescription?: boolean;
};
export type MapDescription = {
    text: string;
    view?: ViewDescription;
    layers?: LayerDescription[];
};
