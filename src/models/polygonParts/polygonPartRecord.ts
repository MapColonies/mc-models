import { Polygon } from 'geojson';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { FieldCategory, IPropFieldConfigInfo, fieldConfig, getFieldConfig } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { DataFileType, IPropSHPMapping, getInputDataMapping, inputDataMapping } from '../layerMetadata/decorators/property/shp.decorator';
import { catalogDB, getCatalogDBMapping } from '../layerMetadata/decorators/property/catalogDB.decorator';
import { getTsTypesMapping, tsTypes, TsTypes } from '../layerMetadata/decorators/property/tsTypes.decorator';
import { ICatalogDBEntityMapping, IOrmCatalog, IPYCSWMapping, ProductType } from '../layerMetadata';
import { graphqlClass, IPropCatalogDBMapping } from '../common';
import { getCatalogDBEntityMapping } from '../layerMetadata/decorators/class/catalogDBEntity.decorator';
import { VALIDATIONS } from '../raster/constants';

interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

@graphqlClass({ alias: 'PolygonPartRecord' })
export class PolygonPartRecord implements IPolygonPart, IOrmCatalog {
  //#region METADATA: sourceId
  @catalogDB({
    column: {
      name: 'source_id',
      type: 'text',
      nullable: true,
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.Source',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
  })
  //#endregion
  public sourceId?: string;

  //#region METADATA: sourceName
  @catalogDB({
    column: {
      name: 'source_name',
      type: 'text',
      nullable: false,
    },
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
  })
  //#endregion
  public sourceName!: string;

  //#region METADATA: productId
  @catalogDB({
    column: {
      name: 'product_id',
      type: 'text',
      nullable: false,
    },
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
      name: 'product_type',
      type: 'text',
      nullable: false,
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'properties.SourceName',
  })
  @tsTypes({
    mappingType: TsTypes.PRODUCTTYPE,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
  })
  //#endregion
  public productType!: ProductType;

  //#region METADATA: description
  @catalogDB({
    column: {
      name: 'description',
      type: 'text',
      nullable: true,
    },
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
      name: 'imaging_time_begin_utc',
      type: 'timestamp with time zone',
      nullable: false,
    },
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
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public imagingTimeBeginUTC!: Date;

  //#region METADATA: imagingTimeEndUTC
  @catalogDB({
    column: {
      name: 'imaging_time_end_utc',
      type: 'timestamp with time zone',
      nullable: false,
    },
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
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public imagingTimeEndUTC!: Date;

  //#region METADATA: horizontalAccuracyCE90
  @catalogDB({
    column: {
      name: 'horizontal_accuracy_ce_90',
      type: 'real',
    },
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
    isLifecycleEnvolved: true,
  })
  //#endregion
  public horizontalAccuracyCE90!: number;

  //#region METADATA: sensors
  @catalogDB({
    column: {
      name: 'sensors',
      type: 'text',
      nullable: false,
    },
    field: {
      overrideType: TsTypes.STRING,
    },
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
    isLifecycleEnvolved: true,
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
      name: 'countries',
      type: 'text',
      nullable: true,
    },
    field: {
      overrideType: TsTypes.STRING,
    },
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
      name: 'cities',
      type: 'text',
      nullable: true,
    },
    field: {
      overrideType: TsTypes.STRING,
    },
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
      name: 'resolution_degree',
      type: 'numeric',
    },
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
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
      name: 'resolution_meter',
      type: 'numeric',
    },
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.maxResolutionMeter.min', 'info-field-tooltip.maxResolutionMeter.max'],
    isAutoGenerated: true,
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
      name: 'source_resolution_meter',
      type: 'numeric',
    },
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
    ],
  })
  //#endregion
  public sourceResolutionMeter!: number;

  //#region METADATA: footprint
  @catalogDB({
    column: {
      name: 'footprint',
      type: 'text',
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.PRODUCT,
    valuePath: 'footprint',
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
      name: 'id',
      type: 'text',
      nullable: false,
      primary: true,
    },
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public id!: string;

  //#region RECORD: partId
  @catalogDB({
    column: {
      name: 'part_id',
      type: 'number',
      nullable: false,
    },
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
      name: 'catalog_id',
      type: 'text',
      nullable: false,
    },
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
  public catalogId!: string;

  //#region RECORD: productVersion [Version number of the best layer when it was updated]
  @catalogDB({
    column: {
      name: 'product_version',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: false,
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
      name: 'ingestion_date_utc',
      type: 'timestamp with time zone',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public ingestionDateUTC!: Date;

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    return [];
  }

  public static getShpMappings(includeCustomLogic = false): IPropSHPMapping[] {
    const ret = [];
    const layer = new PolygonPartRecord();
    for (const prop in layer) {
      const shpMap = getInputDataMapping<PolygonPartRecord>(layer, prop);
      const tsTypesMap = getTsTypesMapping<PolygonPartRecord>(layer, prop);
      if (shpMap && tsTypesMap && (includeCustomLogic || shpMap.isCustomLogic === undefined || !shpMap.isCustomLogic)) {
        ret.push({
          prop: prop,
          ...shpMap,
          ...tsTypesMap,
        });
      }
    }
    return ret;
  }

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const layer = new PolygonPartRecord();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<PolygonPartRecord>(layer, prop);
      if (fieldConfigMap) {
        ret.push({
          prop: prop,
          ...fieldConfigMap,
        });
      }
    }
    return ret;
  }

  public getORMCatalogMappings(): IPropCatalogDBMapping[] {
    const ret = [];

    for (const prop in this) {
      const catalogDbMap = getCatalogDBMapping(this, prop);
      const tsTypesMap = getTsTypesMapping(this, prop);
      if (catalogDbMap && tsTypesMap) {
        ret.push({
          prop: prop,
          ...catalogDbMap,
          ...tsTypesMap,
        });
      }
    }
    return ret;
  }

  public getORMCatalogEntityMappings(): ICatalogDBEntityMapping {
    return getCatalogDBEntityMapping(PolygonPartRecord);
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
