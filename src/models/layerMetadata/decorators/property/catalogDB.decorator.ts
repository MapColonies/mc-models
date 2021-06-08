import 'reflect-metadata';
import { IDescribeTsType } from './tsTypes.decorator';

const catalogDbMetadataKey = Symbol('catalogdbmapping');

export interface IColumnProps {
  name?: string;
  type: string;
  nullable?: boolean;
  default?: string;
  primary?: boolean;
  unique?: boolean;
  spatialFeatureType?: string;
  srid?: number;
}

export interface IFieldProps {
  overrideType?: IDescribeTsType;
}

export interface ICatalogDBMapping {
  column: IColumnProps; // column properties
  field?: IFieldProps; // field properties
}

export function catalogDB(catalogdbmapping: ICatalogDBMapping): PropertyDecorator {
  return Reflect.metadata(catalogDbMetadataKey, catalogdbmapping);
}

export function getCatalogDBMapping<T>(target: T, propertyKey: string): ICatalogDBMapping | undefined {
  return Reflect.getMetadata(catalogDbMetadataKey, target, propertyKey) as ICatalogDBMapping;
}
