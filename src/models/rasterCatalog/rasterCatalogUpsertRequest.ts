import { Link } from '../common';
import { LayerMetadata } from '../layerMetadata';

export interface IRasterCatalogUpsertRequestBody {
  catalogId: string;
  metadata: LayerMetadata;
  links?: Link[];
}
