import View from 'ol/View';
import Layer from 'ol/layer/Layer';

export type ViewDescription = {
  bbox?: number[];
  center?: number[];
  projection?: string;
  rotation?: number;
  scale?: number;
  zoom?: number;
  epsg4326?: {
    bbox?: number[];
    center?: number[];
  };
};

export type LayerDescription = {
  type: string;
  source: string;
  details: any;
};

export type LayerFilterFunc = (layer: Layer) => boolean | undefined;
export type ViewDescriberFunc = (view: View) => Promise<ViewDescription>;
export type LayerDescriberFunc = (layer: Layer) => Promise<LayerDescription>;
export type TextualDescriberFunc = (viewDescription?: ViewDescription
  , layerDescriptions?: LayerDescription[]) => Promise<string>;

export type DescribeConfiguration = {
  layerFilter?: LayerFilterFunc;
  viewDescriber?: ViewDescriberFunc;
  layerDescriber?: LayerDescriberFunc;
  textualDescriber?: TextualDescriberFunc;
};

export type MapDescription = {
  text: string;
  view?: ViewDescription;
  layers?: LayerDescription[];
};
