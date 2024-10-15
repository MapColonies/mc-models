import 'reflect-metadata';
import { IDescribeTsType } from './tsTypes.decorator';

const catalogDbMetadataKey = Symbol('catalogdbmapping');

export interface IColumnProps {
  name?: string;
  type: string;
  readonly?: boolean;
  enum?: { enumName: string; enum: string };
  nullable?: boolean;
  default?: string;
  primary?: boolean;
  unique?: boolean;
  spatialFeatureType?: string;
  srid?: number;
  collation?: string;
  columnType?: ORMColumnType; // deafult is 'Column'
  insert?: boolean;
}

export interface IFieldProps {
  overrideType?: IDescribeTsType;
}

export enum ORMColumnType {
  COLUMN = 'Column',
  CREATE_DATE_COLUMN = 'CreateDateColumn',
  DELETE_DATE_COLUMN = 'DeleteDateColumn',
  OBJECT_ID_COLUMN = 'ObjectIdColumn',
  PRIMARY_COLUMN = 'PrimaryColumn',
  PRIMARY_GENERATED_COLUMN = 'PrimaryGeneratedColumn',
  UPDATE_DATE_COLUMN = 'UpdateDateColumn',
  VERSION_COLUMN = 'VersionColumn',
  VIEW_COLUMN = 'ViewColumn',
}

export interface ICatalogDBMapping {
  column: IColumnProps; // column properties
  index?: { spatial?: true };
  customChecks?: { name?: string; expression: string }[];
  field?: IFieldProps; // field properties
}

export function catalogDB(catalogdbmapping: ICatalogDBMapping): PropertyDecorator {
  return Reflect.metadata(catalogDbMetadataKey, catalogdbmapping);
}

export function getCatalogDBMapping<T>(target: T, propertyKey: string): ICatalogDBMapping | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(catalogDbMetadataKey, target, propertyKey) as ICatalogDBMapping;
}
