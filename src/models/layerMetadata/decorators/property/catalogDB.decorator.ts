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

export enum SpecialORMColumnType {
  Column = 'Column',
  CreateDateColumn = 'CreateDateColumn',
  DeleteDateColumn = 'DeleteDateColumn',
  ObjectIdColumn = 'ObjectIdColumn',
  PrimaryColumn = 'PrimaryColumn',
  PrimaryGeneratedColumn = 'PrimaryGeneratedColumn',
  UpdateDateColumn = 'UpdateDateColumn',
  VersionColumn = 'VersionColumn',
  ViewColumn = 'ViewColumn',
}

export interface ICatalogDBMapping {
  column: IColumnProps; // column properties
  columnType?: SpecialORMColumnType; // deafult is 'Column'
  field?: IFieldProps; // field properties
}

export function catalogDB(catalogdbmapping: ICatalogDBMapping): PropertyDecorator {
  return Reflect.metadata(catalogDbMetadataKey, catalogdbmapping);
}

export function getCatalogDBMapping<T>(target: T, propertyKey: string): ICatalogDBMapping | undefined {
  return Reflect.getMetadata(catalogDbMetadataKey, target, propertyKey) as ICatalogDBMapping;
}
