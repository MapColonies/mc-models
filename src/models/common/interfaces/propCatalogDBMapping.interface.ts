import { ICatalogDBMapping } from '../../layerMetadata/decorators/property/catalogDB.decorator';
import { ITsTypesMapping } from '../../layerMetadata/decorators/property/tsTypes.decorator';
import { IValidationConfigInfoMapping } from '../decorators/fieldConfig/fieldConfig.decorator';

export interface IPropCatalogDBMapping extends ICatalogDBMapping, ITsTypesMapping, IValidationConfigInfoMapping {
  prop: string;
}
