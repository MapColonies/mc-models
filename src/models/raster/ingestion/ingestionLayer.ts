import { LayerMetadata } from '../../layerMetadata';
import { PolygonPart } from '../../polygonParts/polygonPart';

export type UpdateRasterLayerMetadata = Pick<LayerMetadata, 'productSubType' | 'description' | 'region' | 'classification' | 'scale'>;

export type NewRasterLayerMetadata = UpdateRasterLayerMetadata &
  Pick<LayerMetadata, 'productId' | 'producerName' | 'productType' | 'srs' | 'srsName' | 'transparency' | 'productName'>;

export interface InputFiles {
  originDirectory: string;
  fileNames: string[];
}

export interface RasterIngestionLayer {
  metadata: NewRasterLayerMetadata | UpdateRasterLayerMetadata;
  partData: PolygonPart[];
  inputFiles: InputFiles;
}
