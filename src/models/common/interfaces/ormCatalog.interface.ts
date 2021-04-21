import { ICatalogDBEntityMapping } from '../../layerMetadata/decorators/class/catalogDBEntity.decorator';
import { IPropCatalogDBMapping } from './propCatalogDBMapping.interface';

export interface IOrmCatalog {
  getORMCatalogMappings: () => IPropCatalogDBMapping[];
  getORMCatalogEntityMappings: () => ICatalogDBEntityMapping;
}
