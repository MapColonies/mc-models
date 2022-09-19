import { Link } from '../common';
import { LayerMetadata } from '../layerMetadata';

export interface IRasterCatalogUpsertRequestBody {
  metadata: LayerMetadata;
  links?: Link[];
}
