import 'reflect-metadata';
import { LayerMetadata } from '../index';

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
  table: string; // table name
  column: IColumnProps; // column properties
}

export function catalogDB(catalogdbmapping: ICatalogDBMapping): PropertyDecorator {
  return Reflect.metadata(catalogDbMetadataKey, catalogdbmapping);
}

export function getCatalogDBMapping(target: LayerMetadata, propertyKey: string): ICatalogDBMapping | undefined {
  return Reflect.getMetadata(catalogDbMetadataKey, target, propertyKey) as ICatalogDBMapping;
}
