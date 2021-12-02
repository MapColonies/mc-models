import 'reflect-metadata';

const tsTypesMetadataKey = Symbol('catalogdbmapping');

export enum PropertiesTypes {
  PRIMITIVE = 'primitive',
  ENUM = 'enum',
  CLASS = 'class',
  ARRAY = 'array',
  OBJECT = 'object',
  ENUM_ARRAY = 'enumArray',
}
export interface IDescribeTsType {
  value: string;
  type: PropertiesTypes;
  importFromPackage?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export const TsTypes: Record<string, IDescribeTsType> = {
  STRING: {
    value: 'string',
    type: PropertiesTypes.PRIMITIVE,
  },
  STRING_ARRAY: {
    value: 'string',
    type: PropertiesTypes.ARRAY,
  },
  BOOLEAN: {
    value: 'boolean',
    type: PropertiesTypes.PRIMITIVE,
  },
  DATE: {
    value: 'Date',
    type: PropertiesTypes.PRIMITIVE,
  },
  NUMBER: {
    value: 'number',
    type: PropertiesTypes.PRIMITIVE,
  },
  OBJECT: {
    value: 'object',
    type: PropertiesTypes.OBJECT,
  },
  LINK: {
    value: 'Link',
    type: PropertiesTypes.CLASS,
  },
  LINKS: {
    value: 'Link',
    type: PropertiesTypes.ARRAY,
  },
  SENSORTYPE: {
    value: 'SensorType',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  SENSORTYPE_ARRAY: {
    value: 'SensorType',
    type: PropertiesTypes.ENUM_ARRAY,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  RECORDTYPE: {
    value: 'RecordType',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  VERTICAL_DATUM: {
    value: 'VerticalDatum',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  UNITS: {
    value: 'Units',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  UNDULATION_MODEL: {
    value: 'UndulationModel',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  DATATYPE: {
    value: 'DataType',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  NO_DATA_VALUE: {
    value: 'NoDataValue',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  FIELDCATEGORY: {
    value: 'FieldCategory',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  PRODUCTTYPE: {
    value: 'ProductType',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  DISCRETE_ORDER: {
    value: 'DiscreteOrder',
    type: PropertiesTypes.CLASS,
  },
  DISCRETE_ORDERS: {
    value: 'DiscreteOrder',
    type: PropertiesTypes.ARRAY,
  },
};
/* eslint-enable @typescript-eslint/naming-convention */
export interface ITsTypesMapping {
  mappingType: IDescribeTsType;
}

export function tsTypes(tsTypesMapping: ITsTypesMapping): PropertyDecorator {
  return Reflect.metadata(tsTypesMetadataKey, tsTypesMapping);
}

export function getTsTypesMapping<T>(target: T, propertyKey: string): ITsTypesMapping | undefined {
  return Reflect.getMetadata(tsTypesMetadataKey, target, propertyKey) as ITsTypesMapping;
}
