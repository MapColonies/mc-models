import 'reflect-metadata';

const tsTypesMetadataKey = Symbol('catalogdbmapping');

export enum PropertiesTypes {
  PRIMITIVE = 'primitive',
  ENUM = 'enum',
  CLASS = 'class',
  ARRAY = 'array',
  OBJECT = 'object',
  ENUM_ARRAY = 'enumArray',
  UNION = 'union',
}

/** `PropertiesTypes.UNION` only: one member of the union, paired with the literal value of its discriminant field. */
export interface IUnionBranch {
  className: string;
  discriminantValue: string;
}

export interface IDescribeTsType {
  value: string;
  type: PropertiesTypes;
  importFromPackage?: string;
  /** `PropertiesTypes.UNION` only: the field name read on each branch to pick its GraphQL ObjectType (e.g. `'type'`). */
  discriminant?: string;
  /** `PropertiesTypes.UNION` only: the registered CLASS names forming the union. */
  branches?: IUnionBranch[];
  /**
   * `PropertiesTypes.UNION` only: the type this field resolves to on the generated InputType side,
   * since GraphQL has no input-type union - e.g. a flat CLASS merging every branch's fields.
   */
  inputType?: IDescribeTsType;
}

//****** IMPORTANT: ALL external enums which in use MUST be proxied by mc-models.
//****** In other words, enums MUST be imported in generated code(graphQL) from MC_MODELS ONLY,
//****** in order to be compliant to types package which in use by MC-MODELS
/* eslint-disable @typescript-eslint/naming-convention */
export const TsTypes = {
  STRING: {
    value: 'string',
    type: PropertiesTypes.PRIMITIVE,
  },
  STRING_ARRAY: {
    value: 'string',
    type: PropertiesTypes.ARRAY,
  },
  NULLABLE_STRING: {
    value: 'string | null',
    type: PropertiesTypes.PRIMITIVE,
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
  POLYGON: {
    value: 'Polygon',
    type: PropertiesTypes.OBJECT,
    importFromPackage: 'geojson',
  },
  LINK: {
    value: 'Link',
    type: PropertiesTypes.CLASS,
  },
  LINKS: {
    value: 'Link',
    type: PropertiesTypes.ARRAY,
  },
  FEATURESTRUCTURE: {
    value: 'VectorFeatureTypeStructure',
    type: PropertiesTypes.CLASS,
  },
  FIELDFEATURETYPES: {
    value: 'FieldFeatureType',
    type: PropertiesTypes.ARRAY,
  },
  RECORDTYPE: {
    value: 'RecordType',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  UNITS: {
    value: 'Units',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  DATATYPE: {
    value: 'DataType',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  DEM_DATATYPE: {
    value: 'DEMDataType',
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
  TRANSPARENCY: {
    value: 'Transparency',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  TILE_OUTPUT_FORMAT: {
    value: 'TileOutputFormat',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  RECORD_STATUS: {
    value: 'RecordStatus',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  SOURCE_TYPE: {
    value: 'SourceType',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  DOMAIN: {
    value: 'Domain',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  RESOURCE_RESOLUTION_STATUS: {
    value: 'ResourceResolutionStatus',
    type: PropertiesTypes.ENUM,
    importFromPackage: '@map-colonies/mc-model-types',
  },
  BASEMAP_LAYER: {
    value: 'BasemapLayer',
    type: PropertiesTypes.CLASS,
  },
} satisfies Record<string, IDescribeTsType>;

/* eslint-enable @typescript-eslint/naming-convention */
export interface ITsTypesMapping {
  mappingType: IDescribeTsType;
}

export function tsTypes(tsTypesMapping: ITsTypesMapping): PropertyDecorator {
  return Reflect.metadata(tsTypesMetadataKey, tsTypesMapping);
}

export function getTsTypesMapping<T>(target: T, propertyKey: string): ITsTypesMapping | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(tsTypesMetadataKey, target, propertyKey) as ITsTypesMapping;
}
