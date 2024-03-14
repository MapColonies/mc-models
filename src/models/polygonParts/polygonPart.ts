import { GeoJSON } from 'geojson';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import {
  FieldCategory,
  fieldConfig,
  getFieldConfig,
  IFieldConfigInfo,
  IPropFieldConfigInfo,
} from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { getInputDataMapping, IDataMapping, DataFileType, inputDataMapping } from '../layerMetadata/decorators/property/shp.decorator';
import { getCatalogDBMapping, ICatalogDBMapping, catalogDB } from '../layerMetadata/decorators/property/catalogDB.decorator';
import { getTsTypesMapping, ITsTypesMapping, tsTypes, TsTypes } from '../layerMetadata/decorators/property/tsTypes.decorator';

export interface IPolygonPart {
  id: string | undefined;
  classification: string | undefined;
  name: string | undefined;
  description: string | undefined;
  resolutionDegree: number | undefined;
  resolutionMeter: number | undefined;
  horizontalAccuracyCE90: number | undefined;
  countries: string[] | undefined;
  cities: string[] | undefined;
  sensors: string[] | undefined;
  imagingTimeBeginUTC: Date | undefined;
  imagingTimeEndUTC: Date | undefined;
  geometry: GeoJSON | undefined;
}
export interface IPropSHPMapping extends IDataMapping, ITsTypesMapping {
  prop: string;
}

export class PolygonPart implements IPolygonPart {
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
    valuePath: 'features[0].properties.Source',
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

  //#region METADATA: classification
  @catalogDB({
    column: {
      name: 'classification',
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
    category: FieldCategory.GENERAL,
    lookupTable: 'classification',
  })
  //#endregion
  public classification: string | undefined = undefined;

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
    valuePath: 'features[0].properties.SourceName',
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
    valuePath: 'features[0].properties.Dsc',
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
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***min(features[].properties.UpdateDate)***',
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
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***max(features[].properties.UpdateDate)***',
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
    valuePath: 'features[0].properties.Ep90',
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
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***features[].properties.SensorType***',
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
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***features[].properties.Countries***',
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
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***features[].properties.Cities***',
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

  //#region METADATA: resolutionDegree
  @catalogDB({
    column: {
      name: 'resolutionDegree',
      type: 'numeric',
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.TFW,
    valuePath: '[0]',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: [
      'info-field-tooltip.maxResolutionDeg.tooltip',
      'info-general-tooltip.required',
      'info-field-tooltip.maxResolutionDeg.min',
      'info-field-tooltip.maxResolutionDeg.max',
    ],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionDeg.min',
        valueType: 'value',
        min: 0.00000009,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionDeg.max',
        valueType: 'value',
        max: 0.072,
      },
    ],
  })
  //#endregion
  public resolutionDegree: number | undefined = undefined;

  //#region METADATA: resolutionMeter
  @catalogDB({
    column: {
      name: 'resolutionMeter',
      type: 'numeric',
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Resolution',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.maxResolutionMeter.min', 'info-field-tooltip.maxResolutionMeter.max'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionMeter.min',
        valueType: 'value',
        min: 0.01,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionMeter.max',
        valueType: 'value',
        max: 8000,
      },
    ],
  })
  //#endregion
  public resolutionMeter: number | undefined = undefined;

  //#region METADATA: geometry
  @catalogDB({
    column: {
      name: 'geometry',
      type: 'text',
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.PRODUCT,
    valuePath: 'features[0].geometry',
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

  public static getShpMapping(prop: string): IDataMapping | undefined {
    return getInputDataMapping<PolygonPart>(new PolygonPart(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping<PolygonPart>(new PolygonPart(), prop);
  }

  public static getFieldConfig(prop: string): IFieldConfigInfo | undefined {
    return getFieldConfig<PolygonPart>(new PolygonPart(), prop);
  }

  public static getCatalogDBMappings(): IPropCatalogDBMapping[] {
    const ret = [];
    const layer = new PolygonPart();
    for (const prop in layer) {
      const catalogDbMap = getCatalogDBMapping<PolygonPart>(layer, prop);
      const tsTypesMap = getTsTypesMapping<PolygonPart>(layer, prop);
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

  public static getShpMappings(includeCustomLogic = false): IPropSHPMapping[] {
    const ret = [];
    const layer = new PolygonPart();
    for (const prop in layer) {
      const shpMap = getInputDataMapping<PolygonPart>(layer, prop);
      const tsTypesMap = getTsTypesMapping<PolygonPart>(layer, prop);
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
    const layer = new PolygonPart();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<PolygonPart>(layer, prop);
      if (fieldConfigMap) {
        ret.push({
          prop: prop,
          ...fieldConfigMap,
        });
      }
    }
    return ret;
  }
}
