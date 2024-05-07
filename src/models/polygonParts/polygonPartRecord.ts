import { GeoJSON } from 'geojson';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { FieldCategory, IPropFieldConfigInfo, fieldConfig, getFieldConfig } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { DataFileType, IPropSHPMapping, getInputDataMapping, inputDataMapping } from '../layerMetadata/decorators/property/shp.decorator';
import { catalogDB, getCatalogDBMapping } from '../layerMetadata/decorators/property/catalogDB.decorator';
import { getTsTypesMapping, tsTypes, TsTypes } from '../layerMetadata/decorators/property/tsTypes.decorator';
import { ICatalogDBEntityMapping, IOrmCatalog, IPYCSWMapping } from '../layerMetadata';
import { graphqlClass, IPropCatalogDBMapping } from '../common';
import { getCatalogDBEntityMapping } from '../layerMetadata/decorators/class/catalogDBEntity.decorator';

interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}
export interface IPolygonPart {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  resolutionDegree: number | undefined;
  resolutionMeter: number | undefined;
  sourceResolutionMeter: number | undefined;
  horizontalAccuracyCE90: number | undefined;
  countries: string[] | undefined;
  cities: string[] | undefined;
  sensors: string[] | undefined;
  imagingTimeBeginUTC: Date | undefined;
  imagingTimeEndUTC: Date | undefined;
  geometry: GeoJSON | undefined;
}

@graphqlClass({ alias: 'PolygonPartRecord' })
export class PolygonPartRecord implements IPolygonPart, IOrmCatalog {
  //#region METADATA: id
  @catalogDB({
    column: {
      name: 'id',
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
  public id: string | undefined = undefined;

  //#region METADATA: name
  @catalogDB({
    column: {
      name: 'name',
      type: 'text',
      nullable: true,
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
  public name: string | undefined = undefined;

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
  public description: string | undefined = undefined;

  //#region METADATA: imagingTimeBeginUTC
  @catalogDB({
    column: {
      name: 'imagingTimeBeginUTC',
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
  public imagingTimeBeginUTC: Date | undefined = undefined;

  //#region METADATA: imagingTimeEndUTC
  @catalogDB({
    column: {
      name: 'imagingTimeEndUTC',
      type: 'timestamp without time zone',
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
  public imagingTimeEndUTC: Date | undefined = undefined;

  //#region METADATA: horizontalAccuracyCE90
  @catalogDB({
    column: {
      name: 'horizontalAccuracyCE90',
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
        min: 0.01,
      },
      {
        errorMsgCode: 'validation-field.minHorizontalAccuracyCE90.max',
        valueType: 'value',
        max: 4000,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public horizontalAccuracyCE90: number | undefined = undefined;

  //#region METADATA: sensors
  @catalogDB({
    column: {
      name: 'sensors',
      type: 'text',
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
  public sensors: string[] | undefined = undefined;

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
  public countries: string[] | undefined = undefined;

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
  public cities: string[] | undefined = undefined;

  //#region METADATA: resolutionDegree??? [from INGESTION PARAMS]
  @catalogDB({
    column: {
      name: 'resolutionDegree',
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
        min: 1.67638e-7,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionDeg.max',
        valueType: 'value',
        max: 0.703125,
      },
    ],
  })
  //#endregion
  public resolutionDegree: number | undefined = undefined;

  //#region METADATA: resolutionMeter [from INGESTION PARAMS]
  @catalogDB({
    column: {
      name: 'resolutionMeter',
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
        min: 0.0185,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionMeter.max',
        valueType: 'value',
        max: 78273,
      },
    ],
  })
  //#endregion
  public resolutionMeter: number | undefined = undefined;

  //#region METADATA: sourceResolutionMeter [READONLY]
  @catalogDB({
    column: {
      name: 'sourceResolutionMeter',
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
  public sourceResolutionMeter: number | undefined = undefined;

  //#region METADATA: geometry
  @catalogDB({
    column: {
      name: 'geometry',
      type: 'text',
    },
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
  public geometry: GeoJSON | undefined = undefined;

  //#region RECORD: internalId_partId
  @catalogDB({
    column: {
      name: 'internalId_partId',
      type: 'number',
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
  public internalId_partId: number | undefined;

  //#region RECORD: partId
  @catalogDB({
    column: {
      name: 'partId',
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
  public partId: number | undefined;

  //#region RECORD: recordId
  @catalogDB({
    column: {
      name: 'recordId',
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
  public recordId: string | undefined = 'UNKNOWN';

  //#region RECORD: updatedInVersion [Version number of the best layer when it was updated]
  @catalogDB({
    column: {
      name: 'version',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-field-tooltip.productVersion.pattern'],
    isAutoGenerated: true,
    validation: [
      {
        errorMsgCode: 'validation-field.productVersion.pattern',
        valueType: 'value',
        pattern: '^[1-9]\\d{0,2}(\\.(0|[1-9]\\d?))?$',
      },
    ],
  })
  //#endregion
  public updatedInVersion: string | undefined = undefined;

  //#region RECORD: ingestionDateUTC
  @catalogDB({
    column: {
      name: 'ingestionDateUTC',
      type: 'timestamp with time zone',
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
  public ingestionDateUTC: Date | undefined = undefined;

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
