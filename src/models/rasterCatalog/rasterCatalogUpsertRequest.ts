import { Link } from '../common';
import { LayerMetadata, PycswLayerCatalogRecord } from '../layerMetadata';

export type UpdateLayerMetadata = Partial<
  Pick<
    PycswLayerCatalogRecord,
    'classification' | 'productName' | 'productSubType' | 'description' | 'producerName' | 'region' | 'scale' | 'keywords'
  >
>;

export interface IRasterCatalogUpsertRequestBody {
  metadata: LayerMetadata;
  links?: Link[];
}

export interface IRasterCatalogEditRequestBody {
  metadata: UpdateLayerMetadata;
}
