import { Link } from '../common';
import { LayerMetadata } from '../layerMetadata';

export interface IRasterCatalogUpsertRequestBody {
  id: string;
  metadata: LayerMetadata;
  links?: Link[];
}
