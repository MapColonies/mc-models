import { Link } from '../common';
import { Layer3DMetadata } from '../layerMetadata';

export interface I3DCatalogUpsertRequestBody extends Layer3DMetadata {
  id: string;
  links: Link[];
}
