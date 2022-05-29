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
import { RecordType } from '../pycsw/coreEnums';
import { IMetadataCommonModel } from './interfaces/metadataCommonModel';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { getInputDataMapping, IDataMapping, DataFileType, inputDataMapping } from './decorators/property/shp.decorator';
import { getCatalogDBMapping, ICatalogDBMapping, catalogDB } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, ITsTypesMapping, tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';
import { ProductType } from './enums';
import { DiscreteOrder } from './discreteOrder';

export interface IBestMetadata {
  productVersion: string | undefined;
  maxResolutionDeg: number | undefined;
  rms: number | undefined;
  scale: number | undefined;
  discretes: DiscreteOrder[] | undefined;
}
export interface IPropSHPMapping extends IDataMapping, ITsTypesMapping {
  prop: string;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class BestMetadata implements IBestMetadata, IMetadataCommonModel {
  //#region COMMON FIELDS
  //#region COMMON: type
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:type',
    queryableField: 'mc:type',
    pycswField: 'pycsw:Type',
  })
  @catalogDB({
    column: {
      name: 'type',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.RECORDTYPE,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public type: RecordType | undefined = RecordType.RECORD_RASTER;

  //#region COMMON: classification
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:classification',
    queryableField: 'mc:classification',
    pycswField: 'pycsw:Classification',
  })
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
    isAutoGenerated: true,
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public classification: string | undefined = undefined;

  //#region COMMON: productName
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:productName',
    queryableField: 'mc:productName',
    pycswField: 'pycsw:Title',
  })
  @catalogDB({
    column: {
      name: 'product_name',
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
    isManuallyEditable: true,
  })
  //#endregion
  public productName: string | undefined = undefined;

  //#region COMMON: description
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:description',
    queryableField: 'mc:description',
    pycswField: 'pycsw:Abstract',
  })
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
    isManuallyEditable: true,
  })
  //#endregion
  public description: string | undefined = undefined;

  //#region COMMON: srsId
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:SRS',
    queryableField: 'mc:SRS',
    pycswField: 'pycsw:CRS',
  })
  @catalogDB({
    column: {
      name: 'srs',
      type: 'text',
      nullable: false,
      default: '4326',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isAutoGenerated: true,
  })
  //#endregion
  public srsId: string | undefined = undefined;

  //#region COMMON: producerName
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:producerName',
    queryableField: 'mc:producerName',
    pycswField: 'pycsw:Creator',
  })
  @catalogDB({
    column: {
      name: 'producer_name',
      type: 'text',
      default: 'IDFMU',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public producerName: string | undefined = 'IDFMU';

  //#region COMMON: creationDate
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:creationDate',
    queryableField: 'mc:creationDate',
    pycswField: 'pycsw:CreationDate',
  })
  @catalogDB({
    column: {
      name: 'creation_date',
      type: 'timestamp without time zone',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isAutoGenerated: true,
  })
  //#endregion
  public creationDate: Date | undefined = undefined;

  //#region COMMON: ingestionDate
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:ingestionDate',
    queryableField: 'mc:ingestionDate',
    pycswField: 'pycsw:IngestionDate',
  })
  @catalogDB({
    column: {
      name: 'ingestion_date',
      type: 'timestamp without time zone',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public ingestionDate: Date | undefined = undefined;

  //#region COMMON: updateDate
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:updateDate',
    queryableField: 'mc:updateDate',
    pycswField: 'pycsw:UpdateDate',
  })
  @catalogDB({
    column: {
      name: 'update_date',
      type: 'timestamp without time zone',
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
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public updateDate: Date | undefined = undefined;

  //#region COMMON: sourceDateStart
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:imagingTime_begin',
    queryableField: 'mc:imagingTime_begin',
    pycswField: 'pycsw:TempExtent_begin',
  })
  @catalogDB({
    column: {
      name: 'source_start_date',
      type: 'timestamp without time zone',
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
  @graphql({
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isAutoGenerated: true,
  })
  //#endregion
  public sourceDateStart: Date | undefined = undefined;

  //#region COMMON: sourceDateEnd
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:imagingTime_end',
    queryableField: 'mc:imagingTime_end',
    pycswField: 'pycsw:TempExtent_end',
  })
  @catalogDB({
    column: {
      name: 'source_end_date',
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
  @graphql({
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isAutoGenerated: true,
  })
  //#endregion
  public sourceDateEnd: Date | undefined = undefined;

  //#region COMMON: accuracyCE90
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:minHorizontalAccuracyCE90',
    queryableField: 'mc:minHorizontalAccuracyCE90',
    pycswField: 'pycsw:horizontalAccuracyCE90',
  })
  @catalogDB({
    column: {
      name: 'min_horizontal_accuracy_ce_90',
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
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isAutoGenerated: true,
  })
  //#endregion
  public minHorizontalAccuracyCE90: number | undefined = undefined;

  //#region COMMON: sensors
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:sensorType',
    queryableField: 'mc:sensorType',
    pycswField: 'pycsw:sensorType',
  })
  @catalogDB({
    column: {
      name: 'sensor_type',
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
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
    isAutoGenerated: true,
    infoMsgCode: ['info-field-tooltip.sensors.tooltip'],
  })
  //#endregion
  public sensors: string[] | undefined = undefined;

  //#region COMMON: region
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:region',
    queryableField: 'mc:region',
    pycswField: 'pycsw:Region',
  })
  @catalogDB({
    column: {
      name: 'region',
      type: 'text',
    },
    field: {
      overrideType: TsTypes.STRING,
    },
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
  public region: string[] | undefined = undefined;

  //#region COMMON: productId
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:productId',
    queryableField: 'mc:productId',
    pycswField: 'pycsw:ProductId',
  })
  @catalogDB({
    column: {
      name: 'product_id',
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public productId: string | undefined = 'UNKNOWN';
  //#endregion

  //#region BEST SPECIFIC FIELDS
  //#region BEST: productVersion
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:productVersion',
    queryableField: 'mc:productVersion',
    pycswField: 'pycsw:ProductVersion',
  })
  @catalogDB({
    column: {
      name: 'product_version',
      type: 'text',
      nullable: true,
    },
  })
  @inputDataMapping({
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***features[0].properties.Source.Split(-)[1]***',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public productVersion: string | undefined = undefined;

  //#region BEST: productType
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:productType',
    queryableField: 'mc:productType',
    pycswField: 'pycsw:ProductType',
  })
  @catalogDB({
    column: {
      name: 'product_type',
      type: 'text',
      nullable: true,
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.PRODUCT,
    valuePath: 'features[0].properties.Type',
  })
  @tsTypes({
    mappingType: TsTypes.PRODUCTTYPE,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public productType: ProductType | undefined = ProductType.ORTHOPHOTO_BEST;

  //#region BEST: srsName
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:SRSName',
    queryableField: 'mc:SRSName',
    pycswField: 'pycsw:CRSName',
  })
  @catalogDB({
    column: {
      name: 'srs_name',
      type: 'text',
      nullable: false,
      default: 'WGS84GEO',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isAutoGenerated: true,
  })
  //#endregion
  public srsName: string | undefined = undefined;

  //#region BEST: maxResolutionDeg
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:maxResolutionDeg',
    queryableField: 'mc:maxResolutionDeg',
    pycswField: 'pycsw:Resolution',
  })
  @catalogDB({
    column: {
      name: 'max_resolution_deg',
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
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public maxResolutionDeg: number | undefined = undefined;

  //#region BEST: rms
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:rms',
    queryableField: 'mc:rms',
    pycswField: 'pycsw:Rms',
  })
  @catalogDB({
    column: {
      name: 'rms',
      type: 'real',
      nullable: true,
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Rms',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public rms: number | undefined = undefined;

  //#region BEST: scale
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:scale',
    queryableField: 'mc:scale',
    pycswField: 'pycsw:Scale',
  })
  @catalogDB({
    column: {
      name: 'scale',
      type: 'integer',
      nullable: true,
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Scale',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public scale: number | undefined = undefined;

  //#region BEST: footprint
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:footprint',
    queryableField: 'mc:footprint',
    pycswField: 'pycsw:footprint',
  })
  @catalogDB({
    column: {
      name: 'footprint_geojson',
      type: 'text',
      nullable: false,
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'features[0].geometry',
  })
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  @graphql({
    nullable: false,
  })
  //#endregion
  public footprint: GeoJSON | undefined = undefined;

  //#region BEST: layerPolygonParts
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:layerPolygonParts',
    queryableField: 'mc:layerPolygonParts',
    pycswField: 'pycsw:layerPolygonParts',
  })
  @catalogDB({
    column: {
      name: 'layer_polygon_parts',
      type: 'text',
      nullable: true,
    },
  })
  @inputDataMapping({
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***entire geo json feature collection***',
  })
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public layerPolygonParts: GeoJSON | undefined = undefined;
  //#endregion

  //#region BEST: discretes
  @pycsw({
    profile: 'mc_best',
    xmlElement: 'mc:discretes',
    queryableField: 'mc:discretes',
    pycswField: 'pycsw:discretes',
  })
  @catalogDB({
    column: {
      name: 'discretes',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.DISCRETE_ORDERS,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public discretes: DiscreteOrder[] | undefined = undefined;
  //#endregion

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<BestMetadata>(new BestMetadata(), prop);
  }

  public static getShpMapping(prop: string): IDataMapping | undefined {
    return getInputDataMapping<BestMetadata>(new BestMetadata(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping<BestMetadata>(new BestMetadata(), prop);
  }

  public static getFieldConfig(prop: string): IFieldConfigInfo | undefined {
    return getFieldConfig<BestMetadata>(new BestMetadata(), prop);
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new BestMetadata();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<BestMetadata>(layer, prop);
      if (pycswMap) {
        ret.push({
          prop: prop,
          ...pycswMap,
        });
      }
    }
    return ret;
  }

  public static getCatalogDBMappings(): IPropCatalogDBMapping[] {
    const ret = [];
    const layer = new BestMetadata();
    for (const prop in layer) {
      const catalogDbMap = getCatalogDBMapping<BestMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<BestMetadata>(layer, prop);
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
    const layer = new BestMetadata();
    for (const prop in layer) {
      const shpMap = getInputDataMapping<BestMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<BestMetadata>(layer, prop);
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
    const layer = new BestMetadata();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<BestMetadata>(layer, prop);
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
