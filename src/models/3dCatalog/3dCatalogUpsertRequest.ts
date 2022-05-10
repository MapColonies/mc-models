import { Link } from '../common';
import { Layer3DMetadata } from '../layerMetadata/layer3DMetadata';

export interface I3DCatalogUpsertRequestBody {
  metadata: Layer3DMetadata;
  links?: Link[];
}
