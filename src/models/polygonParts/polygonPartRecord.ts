import { Polygon } from 'geojson';
import { keys } from 'ts-transformer-keys';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { FieldCategory, IPropFieldConfigInfo, fieldConfig, getFieldConfig } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { DataFileType, IPropSHPMapping, getInputDataMapping, inputDataMapping } from '../layerMetadata/decorators/property/shp.decorator';
import { catalogDB, getCatalogDBMapping, ORMColumnType } from '../layerMetadata/decorators/property/catalogDB.decorator';
import { getTsTypesMapping, tsTypes, TsTypes } from '../layerMetadata/decorators/property/tsTypes.decorator';
import { ICatalogDBEntityMapping, IOrmCatalog, IPYCSWMapping, ProductType } from '../layerMetadata';
import { getWFSMapping, graphqlClass, IPropCatalogDBMapping, IPropWFSMapping, JAVA_BINDINGS, wfs } from '../common';
import { VALIDATIONS } from '../raster/constants';
import { camelCaseToSnakeCase } from '../helpers/utils';
import { DBEntity, getDBEntityMapping } from '../layerMetadata/decorators/class/DBEntity.decorator';

interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

const POLYGON_PARTS_KEYS = keys<IPolygonPart>();
const POLYGON_PARTS_SERVED_KEYS =
  keys<Omit<IPolygonPart, 'productId' | 'productType' | 'id' | 'catalogId' | 'productVersion' | 'ingestionDateUTC' | 'partId'>>();

@DBEntity({
  table: '***DUMMY_NOT_RELEVANT***',
  className: 'Common',
  isPartial: true,
})
@graphqlClass({ alias: 'PolygonPartRecord', fields: POLYGON_PARTS_KEYS })
export class PolygonPartRecord implements IPolygonPart, IOrmCatalog {
  //#region METADATA: sourceId
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('sourceId'),
      type: 'text',
      nullable: true,
      collation: 'ucs_basic',
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.Source',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
  })
  //#endregion
  public sourceId?: string;

  //#region METADATA: sourceName
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('sourceName'),
      type: 'text',
      nullable: false,
      collation: 'ucs_basic',
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.SourceName',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public sourceName!: string;

  //#region METADATA: productId
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('productId'),
      type: 'text',
      nullable: false,
      collation: 'ucs_basic',
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.SourceName',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
    infoMsgCode: ['info-field-tooltip.productId.pattern'],
    validation: [
      {
        errorMsgCode: 'validation-field.productId.pattern',
        valueType: 'value',
        pattern: VALIDATIONS.productId.pattern,
      },
    ],
  })
  //#endregion
  public productId!: string;

  //#region METADATA: productType
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('productType'),
      type: 'enum',
      enum: {
        enumName: 'product_type_enum',
        enumValues: [
          ProductType.ORTHOPHOTO,
          ProductType.ORTHOPHOTO_BEST,
          ProductType.RASTER_AID,
          ProductType.RASTER_AID_BEST,
          ProductType.RASTER_MAP,
          ProductType.RASTER_MAP_BEST,
          ProductType.RASTER_VECTOR,
          ProductType.RASTER_VECTOR_BEST,
        ],
        // generateValuesConstName: 'PRODUCT_TYPES',

        // enumName: 'product_type_enum',
        // enumType: 'ProductType'
      },
      nullable: false,
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @tsTypes({
    mappingType: TsTypes.PRODUCTTYPE,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public productType!: ProductType;

  //#region METADATA: description
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('description'),
      type: 'text',
      nullable: true,
      collation: 'ucs_basic',
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.Dsc',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public description?: string;

  //#region METADATA: imagingTimeBeginUTC
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('imagingTimeBeginUTC'),
      type: 'timestamp with time zone',
      nullable: false,
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.TIMESTAMP,
  })
  @inputDataMapping({
    isCustomLogic: false,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.UpdateDate',
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.GENERAL,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.sourceDateStart.max'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.sourceDateStart.max',
        valueType: 'field',
        max: 'imagingTimeEndUTC',
      },
      {
        errorMsgCode: 'validation-general.date.future',
        valueType: 'value',
        max: '$NOW',
      },
    ],
  })
  //#endregion
  public imagingTimeBeginUTC!: Date;

  //#region METADATA: imagingTimeEndUTC
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('imagingTimeEndUTC'),
      type: 'timestamp with time zone',
      nullable: false,
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.TIMESTAMP,
  })
  @inputDataMapping({
    isCustomLogic: false,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.UpdateDate',
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.GENERAL,
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.sourceDateStart.min',
        valueType: 'value',
        max: '$NOW',
      },
    ],
  })
  //#endregion
  public imagingTimeEndUTC!: Date;

  //#region METADATA: horizontalAccuracyCE90
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('horizontalAccuracyCE90'),
      type: 'real',
      nullable: false,
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.FLOAT,
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.Ep90',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.minHorizontalAccuracyCE90.min',
        valueType: 'value',
        min: VALIDATIONS.horizontalAccuracyCE90.min,
      },
      {
        errorMsgCode: 'validation-field.minHorizontalAccuracyCE90.max',
        valueType: 'value',
        max: VALIDATIONS.horizontalAccuracyCE90.max,
      },
    ],
  })
  //#endregion
  public horizontalAccuracyCE90!: number;

  //#region METADATA: sensors
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('sensors'),
      type: 'text',
      nullable: false,
      collation: 'ucs_basic',
    },
    field: {
      overrideType: TsTypes.STRING,
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @inputDataMapping({
    isCustomLogic: false,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.SensorType',
  })
  @tsTypes({
    mappingType: TsTypes.STRING_ARRAY,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.GENERAL,
    infoMsgCode: ['info-field-tooltip.sensors.tooltip', 'info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public sensors!: string[];

  //#region METADATA: countries
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('countries'),
      type: 'text',
      nullable: true,
      collation: 'ucs_basic',
    },
    field: {
      overrideType: TsTypes.STRING,
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @inputDataMapping({
    isCustomLogic: false,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.Countries',
  })
  @tsTypes({
    mappingType: TsTypes.STRING_ARRAY,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    infoMsgCode: ['info-field-tooltip.region.tooltip'],
  })
  //#endregion
  public countries?: string[];

  //#region **TO_VERIFY_CITIES?** METADATA: cities
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('cities'),
      type: 'text',
      nullable: true,
    },
    field: {
      overrideType: TsTypes.STRING,
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @inputDataMapping({
    isCustomLogic: false,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.Cities',
  })
  @tsTypes({
    mappingType: TsTypes.STRING_ARRAY,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public cities?: string[];

  //#region METADATA: resolutionDegree??? [from INGESTION PARAMS]
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('resolutionDegree'),
      type: 'numeric',
      nullable: false,
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.BIGDECIMAL,
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isLifecycleEnvolved: true,
    infoMsgCode: [
      'info-field-tooltip.maxResolutionDeg.tooltip',
      'info-general-tooltip.required',
      'info-field-tooltip.maxResolutionDeg.min',
      'info-field-tooltip.maxResolutionDeg.max',
    ],
    validation: [
      {
        errorMsgCode: 'validation-field.maxResolutionDeg.min',
        valueType: 'value',
        min: VALIDATIONS.resolutionDeg.min,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionDeg.max',
        valueType: 'value',
        max: VALIDATIONS.resolutionDeg.max,
      },
    ],
  })
  //#endregion
  public resolutionDegree!: number;

  //#region METADATA: resolutionMeter [from INGESTION PARAMS]
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('resolutionMeter'),
      type: 'numeric',
      nullable: false,
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.BIGDECIMAL,
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.maxResolutionMeter.min', 'info-field-tooltip.maxResolutionMeter.max'],
    isLifecycleEnvolved: true,
    validation: [
      {
        errorMsgCode: 'validation-field.maxResolutionMeter.min',
        valueType: 'value',
        min: VALIDATIONS.resolutionMeter.min,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionMeter.max',
        valueType: 'value',
        max: VALIDATIONS.resolutionMeter.max,
      },
    ],
  })
  //#endregion
  public resolutionMeter!: number;

  //#region METADATA: sourceResolutionMeter [READONLY]
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('sourceResolutionMeter'),
      type: 'numeric',
      nullable: false,
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.BIGDECIMAL,
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.Resolution',
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionMeter.min',
        valueType: 'value',
        min: VALIDATIONS.resolutionMeter.min,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionMeter.max',
        valueType: 'value',
        max: VALIDATIONS.resolutionMeter.max,
      },
    ],
  })
  //#endregion
  public sourceResolutionMeter!: number;

  //#region METADATA: footprint
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('footprint'),
      type: 'geometry',
      spatialFeatureType: 'Polygon',
      srid: 4326,
      nullable: false,
    },
    field: {
      overrideType: TsTypes.POLYGON,
    },
    customChecks: [
      {
        name: 'valid geometry',
        expression: `ST_IsValid('footprint')`,
      },
      {
        name: 'geometry extent',
        expression: `Box2D('footprint') @Box2D(ST_GeomFromText('LINESTRING(-180 -90, 180 90)'))`,
      },
    ],
    index: { spatial: true },
  })
  @wfs({
    binding: JAVA_BINDINGS.POLYGON,
  })
  @inputDataMapping({
    dataFile: DataFileType.PRODUCT,
    valuePath: 'geometry',
  })
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.footprint.json',
        json: true,
      },
    ],
  })
  //#endregion
  public footprint!: Polygon;

  //#region RECORD: id
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('id'),
      type: 'uuid',
      columnType: ORMColumnType.PRIMARY_GENERATED_COLUMN,
      nullable: false,
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.UUID,
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public id!: string;

  //#region RECORD: partId
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('partId'),
      type: 'number',
      nullable: false,
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.UUID,
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public partId!: string;

  //#region RECORD: catalogId
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('catalogId'),
      type: 'uuid',
      nullable: false,
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.UUID,
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public catalogId!: string;

  //#region RECORD: productVersion [Version number of the best layer when it was updated]
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('productVersion'),
      type: 'text',
      nullable: false,
      collation: 'ucs_basic',
    },
  })
  @wfs({
    binding: JAVA_BINDINGS.STRING,
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-field-tooltip.productVersion.pattern'],
    isAutoGenerated: true,
    validation: [
      {
        errorMsgCode: 'validation-field.productVersion.pattern',
        valueType: 'value',
        pattern: VALIDATIONS.productVersion.pattern,
      },
    ],
  })
  //#endregion
  public productVersion!: string;

  //#region RECORD: ingestionDateUTC
  @catalogDB({
    column: {
      name: camelCaseToSnakeCase('ingestionDateUTC'),
      type: 'timestamp with time zone',
      nullable: false,
      insert: false,
      columnType: ORMColumnType.CREATE_DATE_COLUMN,
    },
    field: {
      isReadonly: true,
    },
    index: {},
  })
  @wfs({
    binding: JAVA_BINDINGS.TIMESTAMP,
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public readonly ingestionDateUTC!: Date;

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    return [];
  }

  public static getWFSMappings(): IPropWFSMapping[] {
    const ret: IPropWFSMapping[] = [];
    const layer = new PolygonPartRecord();
    POLYGON_PARTS_SERVED_KEYS.forEach((prop) => {
      const catalogDbMap = getCatalogDBMapping(layer, prop);
      const wfsMap = getWFSMapping<PolygonPartRecord>(layer, prop);
      if (catalogDbMap && wfsMap) {
        const { name, ...rest } = wfsMap;
        ret.push({
          prop: prop,
          name: name ?? prop,
          source: catalogDbMap.column.name as string,
          nillable: catalogDbMap.column.nullable ?? false,
          ...rest,
        });
      }
    });
    return ret;
  }

  public static getShpMappings(includeCustomLogic = false): IPropSHPMapping[] {
    const ret: IPropSHPMapping[] = [];
    const layer = new PolygonPartRecord();
    POLYGON_PARTS_SERVED_KEYS.forEach((prop) => {
      const shpMap = getInputDataMapping<PolygonPartRecord>(layer, prop);
      const tsTypesMap = getTsTypesMapping<PolygonPartRecord>(layer, prop);
      if (shpMap && tsTypesMap && (includeCustomLogic || shpMap.isCustomLogic === undefined || !shpMap.isCustomLogic)) {
        ret.push({
          prop: prop,
          ...shpMap,
          ...tsTypesMap,
        });
      }
    });
    return ret;
  }

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret: IPropFieldConfigInfo[] = [];
    const layer = new PolygonPartRecord();
    POLYGON_PARTS_SERVED_KEYS.forEach((prop) => {
      const fieldConfigMap = getFieldConfig<PolygonPartRecord>(layer, prop);
      if (fieldConfigMap) {
        ret.push({
          prop: prop,
          ...fieldConfigMap,
        });
      }
    });
    return ret;
  }

  public getORMCatalogMappings(): IPropCatalogDBMapping[] {
    const ret: IPropCatalogDBMapping[] = [];

    const layer = new PolygonPartRecord();
    POLYGON_PARTS_KEYS.forEach((prop) => {
      const catalogDbMap = getCatalogDBMapping(layer, prop);
      const fieldConfigMap = getFieldConfig(layer, prop);
      const tsTypesMap = getTsTypesMapping(layer, prop);
      const { validation } = fieldConfigMap ?? {};
      if (catalogDbMap && tsTypesMap) {
        ret.push({
          prop: prop,
          ...catalogDbMap,
          validation,
          ...tsTypesMap,
        });
      }
    });
    return ret;
  }

  public getORMCatalogEntityMappings(): ICatalogDBEntityMapping {
    return getDBEntityMapping(PolygonPartRecord);
  }
}

export interface IPolygonPart {
  id: string;
  partId: string;
  catalogId: string;
  productId: string;
  productVersion: string;
  productType: ProductType;
  sourceId?: string;
  sourceName: string;
  description?: string;
  resolutionDegree: number;
  resolutionMeter: number;
  sourceResolutionMeter: number;
  horizontalAccuracyCE90: number;
  countries?: string[];
  cities?: string[];
  sensors: string[];
  imagingTimeBeginUTC: Date;
  imagingTimeEndUTC: Date;
  ingestionDateUTC: Date;
  footprint: Polygon;
}
