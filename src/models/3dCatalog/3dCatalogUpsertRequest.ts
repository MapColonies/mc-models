import { Link } from '../common';
import { Layer3DMetadata } from '../layerMetadata';

export interface I3DCatalogUpsertRequestBody {
  metadata: Layer3DMetadata;
  links?: Link[];
}
