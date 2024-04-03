import { LayerMetadata } from '../../layerMetadata';
import { PolygonPartRecord } from '../../polygonParts';

export type UpdateRasterLayerMetadata = Pick<LayerMetadata, 'productSubType' | 'description' | 'region' | 'classification' | 'scale'>;
export type NewRasterLayerMetadata = UpdateRasterLayerMetadata &
  Pick<LayerMetadata, 'productId' | 'producerName' | 'productType' | 'srs' | 'srsName' | 'transparency' | 'productName'>;

export type PolygonPart = Pick<
  PolygonPartRecord,
  | 'id'
  | 'name'
  | 'description'
  | 'resolutionDegree'
  | 'resolutionMeter'
  | 'sourceResolutionMeter'
  | 'horizontalAccuracyCE90'
  | 'countries'
  | 'cities'
  | 'sensors'
  | 'imagingTimeBeginUTC'
  | 'imagingTimeEndUTC'
  | 'geometry'
>;

export interface InputFiles {
  originDirectory: string;
  fileNames: string[];
}

export interface RasterIngestionLayer {
  metadata: NewRasterLayerMetadata | UpdateRasterLayerMetadata;
  partData: PolygonPart[];
  inputFiles: InputFiles;
}
