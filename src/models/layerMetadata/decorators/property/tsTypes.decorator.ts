import 'reflect-metadata';

const tsTypesMetadataKey = Symbol('catalogdbmapping');

export enum TsTypes {
  STRING = 'string',
  BOOLEAN = 'boolean',
  DATE = 'Date',
  NUMBER = 'number',
  OBJECT = 'object',
  LINK = 'Link',
  LINKS = 'Link[]',
  SENSORTYPE = 'SensorType',
}

export interface ITsTypesMapping {
  mappingType: TsTypes;
}

export function tsTypes(tsTypesMapping: ITsTypesMapping): PropertyDecorator {
  return Reflect.metadata(tsTypesMetadataKey, tsTypesMapping);
}

export function getTsTypesMapping<T>(target: T, propertyKey: string): ITsTypesMapping | undefined {
  return Reflect.getMetadata(tsTypesMetadataKey, target, propertyKey) as ITsTypesMapping;
}
