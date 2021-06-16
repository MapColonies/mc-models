import 'reflect-metadata';
import { IDescribeTsType } from '../../../layerMetadata';
import { IFieldConfigClassInfo } from './classFieldConfig.decorator';

const fieldConfigMetadataKey = Symbol('fieldconfig');

export enum FieldCategory {
  MAIN = 'MAIN',
  GENERAL = 'GENERAL',
  GEO_INFO = 'GEO_INFO',
}

export interface IFieldConfigInfo {
  category: FieldCategory; // field category
  complexType?: IDescribeTsType; // complex type subfields
  subFields?: IFieldConfigClassInfo; // complex type subfields
  isManuallyEditable?: boolean; // is field might be edited after creation
  isFilterable?: boolean; // is field might participate in filter/search params
  isSortable?: boolean; // is field might participate in sorting
}

export interface IPropFieldConfigInfo extends IFieldConfigInfo {
  prop: string;
}

export function fieldConfig(fieldConfigInfo: IFieldConfigInfo): PropertyDecorator {
  return Reflect.metadata(fieldConfigMetadataKey, fieldConfigInfo);
}

export function getFieldConfig<T>(target: T, propertyKey: string): IFieldConfigInfo | undefined {
  return Reflect.getMetadata(fieldConfigMetadataKey, target, propertyKey) as IFieldConfigInfo;
}
