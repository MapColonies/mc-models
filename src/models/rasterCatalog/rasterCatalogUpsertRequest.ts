import { Link } from '../common';
import { LayerMetadata } from '../layerMetadata';

export type UpdateLayerMetadata = Partial<
  Pick<LayerMetadata, 'classification' | 'productName' | 'productSubType' | 'description' | 'producerName' | 'region' | 'scale'>
>;

export interface IRasterCatalogUpsertRequestBody {
  metadata: LayerMetadata;
  links?: Link[];
}

export interface IRasterCatalogUpdateRequestBody {
  metadata: UpdateLayerMetadata;
}
