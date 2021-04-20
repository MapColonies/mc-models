import { ICatalogDBMapping } from '../../layerMetadata/decorators/property/catalogDB.decorator';
import { ITsTypesMapping } from '../../layerMetadata/decorators/property/tsTypes.decorator';

export interface IPropCatalogDBMapping extends ICatalogDBMapping, ITsTypesMapping {
  prop: string;
}
