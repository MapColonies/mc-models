import { IPropCatalogDBMapping } from '../interfaces/IPropCatalogDBMapping';
import { ICatalogDBEntityMapping } from '../../layerMetadata/decorators/class/catalogDBEntity.decorator';

export interface IOrmCatalog {
  getORMCatalogMappings: () => IPropCatalogDBMapping[];
  getORMCatalogEntityMappings: () => ICatalogDBEntityMapping;
}
