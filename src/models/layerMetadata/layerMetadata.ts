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
import { SensorType } from './enums';

export interface ILayerMetadata {
  productId: string | undefined;
  productVersion: string | undefined;
  productType: string | undefined;
  resolution: number | undefined;
  srsName: string | undefined;
  rms: number | undefined;
  scale: string | undefined;
}
export interface IPropSHPMapping extends IDataMapping, ITsTypesMapping {
  prop: string;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class LayerMetadata implements ILayerMetadata, IMetadataCommonModel {
  //#region COMMON FIELDS
  //#region COMMON: type
  @pycsw({
    profile: 'mc_raster',
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
  @fieldConfig({
    category: FieldCategory.MAIN,
  })
  //#endregion
  public type: RecordType | undefined = RecordType.RECORD_RASTER;

  //#region COMMON: classification
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:classification',
    queryableField: 'mc:classification',
    pycswField: 'pycsw:Classification',
  })
  @catalogDB({
    column: {
      name: 'classification',
      type: 'text',
    },
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
  public classification: string | undefined = undefined;

  //#region COMMON: productName
  @pycsw({
    profile: 'mc_raster',
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
    isRequired: true,
  })
  //#endregion
  public productName: string | undefined = undefined;

  //#region COMMON: description
  @pycsw({
    profile: 'mc_raster',
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
    profile: 'mc_raster',
    xmlElement: 'mc:SRS',
    queryableField: 'mc:SRS',
    pycswField: 'pycsw:CRS',
  })
  @catalogDB({
    column: {
      name: 'srs',
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
    category: FieldCategory.GEO_INFO,
  })
  //#endregion
  public srsId: string | undefined = undefined;

  //#region COMMON: producerName
  @pycsw({
    profile: 'mc_raster',
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
  public producerName: string | undefined = undefined;

  //#region COMMON: creationDate
  @pycsw({
    profile: 'mc_raster',
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
  })
  //#endregion
  public creationDate: Date | undefined = undefined;

  //#region COMMON: ingestionDate
  @pycsw({
    profile: 'mc_raster',
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
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public ingestionDate: Date | undefined = undefined;

  //#region COMMON: updateDate
  @pycsw({
    profile: 'mc_raster',
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
  })
  //#endregion
  public updateDate: Date | undefined = undefined;

  //#region COMMON: sourceDateStart
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:imagingTime_begin',
    queryableField: 'mc:imagingTime_begin',
    pycswField: 'pycsw:TempExtent_begin',
  })
  @catalogDB({
    column: {
      name: 'source_start_date',
      type: 'timestamp without time zone',
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
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public sourceDateStart: Date | undefined = undefined;

  //#region COMMON: sourceDateEnd
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:imagingTime_end',
    queryableField: 'mc:imagingTime_end',
    pycswField: 'pycsw:TempExtent_end',
  })
  @catalogDB({
    column: {
      name: 'source_end_date',
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
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public sourceDateEnd: Date | undefined = undefined;

  //#region COMMON: accuracyCE90
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:horizontalAccuracyCE90',
    queryableField: 'mc:horizontalAccuracyCE90',
    pycswField: 'pycsw:horizontalAccuracyCE90',
  })
  @catalogDB({
    column: {
      name: 'horizontal_accuracy_ce_90',
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
  })
  //#endregion
  public accuracyCE90: number | undefined = undefined;

  //#region COMMON: sensorType    //sensors
  @pycsw({
    profile: 'mc_raster',
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
    mappingType: TsTypes.SENSORTYPE_ARRAY,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
  })
  //#endregion
  public sensorType: SensorType[] | undefined = undefined;

  //#region COMMON: region
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:region',
    queryableField: 'mc:region',
    pycswField: 'pycsw:Region',
  })
  @catalogDB({
    column: {
      name: 'region',
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
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public region: string | undefined = undefined;
  //#endregion

  //#region RASTER SPECIFIC FIELDS
  //#region RASTER: productId
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
  @inputDataMapping({
    isCustomLogic: true,
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: '***features[0].properties.Source.Split(-)[0]***',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
  })
  //#endregion
  public productId: string | undefined = 'UNKNOWN';

  //#region RASTER: productVersion
  @pycsw({
    profile: 'mc_raster',
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
  })
  //#endregion
  public productVersion: string | undefined = undefined;

  //#region RASTER: productType
  @pycsw({
    profile: 'mc_raster',
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
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
  })
  //#endregion
  public productType: string | undefined = undefined;

  //#region RASTER: srsName
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:SRSName',
    queryableField: 'mc:SRSName',
    pycswField: 'pycsw:CRSName',
  })
  @catalogDB({
    column: {
      name: 'srs_name',
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
    category: FieldCategory.GEO_INFO,
  })
  //#endregion
  public srsName: string | undefined = undefined;

  //#region RASTER: resolution
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:resolution',
    queryableField: 'mc:resolution',
    pycswField: 'pycsw:Resolution',
  })
  @catalogDB({
    column: {
      name: 'resolution',
      type: 'real', // check if 'decimal' type is needed
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
  })
  //#endregion
  public resolution: number | undefined = undefined;

  //#region RASTER: rms
  @pycsw({
    profile: 'mc_raster',
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

  //#region RASTER: scale
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:scale',
    queryableField: 'mc:scale',
    pycswField: 'pycsw:Scale',
  })
  @catalogDB({
    column: {
      name: 'scale',
      type: 'text',
      nullable: true,
    },
  })
  @inputDataMapping({
    dataFile: DataFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Scale',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public scale: string | undefined = undefined;

  //#region RASTER: footprint
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:footprint',
    queryableField: 'mc:footprint',
    pycswField: 'pycsw:footprint',
  })
  @catalogDB({
    column: {
      name: 'footprint_geojson',
      type: 'text',
      nullable: true,
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
    nullable: true,
  })
  //#endregion
  public footprint: GeoJSON | undefined = undefined;

  //#region RASTER: layerPolygonParts
  @pycsw({
    profile: 'mc_raster',
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

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<LayerMetadata>(new LayerMetadata(), prop);
  }

  public static getShpMapping(prop: string): IDataMapping | undefined {
    return getInputDataMapping<LayerMetadata>(new LayerMetadata(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping<LayerMetadata>(new LayerMetadata(), prop);
  }

  public static getFieldConfig(prop: string): IFieldConfigInfo | undefined {
    return getFieldConfig<LayerMetadata>(new LayerMetadata(), prop);
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new LayerMetadata();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<LayerMetadata>(layer, prop);
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
    const layer = new LayerMetadata();
    for (const prop in layer) {
      const catalogDbMap = getCatalogDBMapping<LayerMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<LayerMetadata>(layer, prop);
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
    const layer = new LayerMetadata();
    for (const prop in layer) {
      const shpMap = getInputDataMapping<LayerMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<LayerMetadata>(layer, prop);
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
    const layer = new LayerMetadata();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<LayerMetadata>(layer, prop);
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
