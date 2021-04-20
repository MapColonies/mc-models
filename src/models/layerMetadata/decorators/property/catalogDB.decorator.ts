import 'reflect-metadata';

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

export interface ICatalogDBMapping {
  column: IColumnProps; // column properties
}

export function catalogDB(catalogdbmapping: ICatalogDBMapping): PropertyDecorator {
  return Reflect.metadata(catalogDbMetadataKey, catalogdbmapping);
}

export function getCatalogDBMapping<T>(target: T, propertyKey: string): ICatalogDBMapping | undefined {
  return Reflect.getMetadata(catalogDbMetadataKey, target, propertyKey) as ICatalogDBMapping;
}
