import 'reflect-metadata';
import { TsTypes } from './tsTypes.decorator';

const catalogDbMetadataKey = Symbol('catalogdbmapping');

export interface IColumnProps {
  name?: string;
  type: string;
  nullable?: boolean;
  defaultValue?: string;
  isPrimary?: boolean;
  isIndexed?: boolean;
  spatialFeatureType?: string;
  srid?: number;
}

export interface IFieldProps {
  overrideType?: TsTypes;
}

export interface ICatalogDBMapping {
  column: IColumnProps; // column properties
  field?: IFieldProps;
}

export function catalogDB(catalogdbmapping: ICatalogDBMapping): PropertyDecorator {
  return Reflect.metadata(catalogDbMetadataKey, catalogdbmapping);
}

export function getCatalogDBMapping<T>(target: T, propertyKey: string): ICatalogDBMapping | undefined {
  return Reflect.getMetadata(catalogDbMetadataKey, target, propertyKey) as ICatalogDBMapping;
}
