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

export interface ILayerMetadata {
  productVersion: string | undefined;
  maxResolutionDeg: number | undefined;
  rms: number | undefined;
  scale: number | undefined;
  includedInBests: string[] | undefined;
  creationDate: Date | undefined;
  ingestionDate: Date | undefined;
  minHorizontalAccuracyCE90: number | undefined;
  region: string[] | undefined;
  sensors: string[] | undefined;
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
    isManuallyEditable: true,
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
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
    infoMsgCode: ['info-general-tooltip.required'],
    default: '4326',
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
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
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
  })
  //#endregion
  public producerName: string | undefined = undefined;

  //#region COMMON: creationDate
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:creationDateUTC',
    queryableField: 'mc:creationDateUTC',
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
    infoMsgCode: ['info-field-tooltip.creationDate.tooltip'],
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
  //#endregion
  public ingestionDate: Date | undefined = undefined;

  //#region COMMON: updateDate
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:updateDateUTC',
    queryableField: 'mc:updateDateUTC',
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
    infoMsgCode: ['info-field-tooltip.updateDate.tooltip'],
  })
  //#endregion
  public updateDate: Date | undefined = undefined;

  //#region COMMON: sourceDateStart
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:imagingTimeBeginUTC',
    queryableField: 'mc:imagingTimeBeginUTC',
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
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.sourceDateStart.max'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.sourceDateStart.max',
        valueType: 'field',
        max: 'sourceDateEnd',
      },
    ],
  })
  //#endregion
  public sourceDateStart: Date | undefined = undefined;

  //#region COMMON: sourceDateEnd
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:imagingTimeEndUTC',
    queryableField: 'mc:imagingTimeEndUTC',
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public sourceDateEnd: Date | undefined = undefined;

  //#region COMMON: minHorizontalAccuracyCE90
  @pycsw({
    profile: 'mc_raster',
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public minHorizontalAccuracyCE90: number | undefined = undefined;

  //#region COMMON: sensors
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:sensors',
    queryableField: 'mc:sensors',
    pycswField: 'pycsw:sensorType',
  })
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
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isAutoGenerated: true,
    infoMsgCode: ['info-field-tooltip.sensorType.tooltip'],
  })
  //#endregion
  public sensors: string[] | undefined = undefined;

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
    infoMsgCode: ['info-field-tooltip.region.tooltip', 'info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public region: string[] | undefined = undefined;
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
    infoMsgCode: ['info-field-tooltip.productId.tooltip', 'info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
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
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.productVersion.pattern'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.productVersion.pattern',
        valueType: 'value',
        pattern: '^[1-9]\\d{0,2}(\\.(0|[1-9]\\d?))?$',
      },
    ],
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
    mappingType: TsTypes.PRODUCTTYPE,
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
  public productType: ProductType | undefined = undefined;

  //#region RASTER: productSubType
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:productSubType',
    queryableField: 'mc:productSubType',
    pycswField: 'pycsw:productSubType',
  })
  @catalogDB({
    column: {
      name: 'product_sub_type',
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
    isManuallyEditable: true,
    autocomplete: {
      type: 'domain',
      value: 'mc:productSubType',
    },
  })
  //#endregion
  public productSubType: string | undefined = undefined;

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
    infoMsgCode: ['info-general-tooltip.required'],
    default: 'WGS84GEO',
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public srsName: string | undefined = undefined;

  //#region RASTER: max_resolution_deg
  @pycsw({
    profile: 'mc_raster',
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
    infoMsgCode: [
      'info-field-tooltip.resolution.tooltip',
      'info-general-tooltip.required',
      'info-field-tooltip.resolution.min',
      'info-field-tooltip.resolution.max',
    ],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.resolution.min',
        valueType: 'value',
        min: 0.00000009,
      },
      {
        errorMsgCode: 'validation-field.resolution.max',
        valueType: 'value',
        max: 0.072,
      },
    ],
  })
  //#endregion
  public maxResolutionDeg: number | undefined = undefined;

  //#region RASTER: maxResolutionMeter
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:maxResolutionMeter',
    queryableField: 'mc:maxResolutionMeter',
    pycswField: 'pycsw:maxResolutionMeter',
  })
  @catalogDB({
    column: {
      name: 'max_resolution_meter',
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
  @graphql({
    nullable: true,
  })
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
  public maxResolutionMeter: number | undefined = undefined;

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
  // @fieldConfig({
  //   category: FieldCategory.GEO_INFO,
  //   infoMsgCode: ['info-field-tooltip.scale.pattern'],
  //   validation: [
  //     {
  //       errorMsgCode: 'validation-field.scale.pattern',
  //       type: 'value',
  //       pattern: '^(0|[1-9]\\d{0,8})$',
  //     },
  //   ],
  // })
  //#endregion
  public scale: number | undefined = undefined;

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
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isCreationEssential: true,
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
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isCreationEssential: true,
    validation: [
      {
        errorMsgCode: 'validation-field.layerPolygonParts.json',
        json: true,
      },
    ],
  })
  //#endregion
  public layerPolygonParts: GeoJSON | undefined = undefined;

  //#region RASTER: includedInBests
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:includedInBests',
    queryableField: 'mc:includedInBests',
    pycswField: 'pycsw:includedInBests',
  })
  @catalogDB({
    column: {
      name: 'included_in_bests',
      type: 'text',
      nullable: true,
    },
    field: {
      overrideType: TsTypes.NULLABLE_STRING,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING_ARRAY,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public includedInBests: string[] | undefined = undefined;

  //#region RASTER: rawProductData
  @catalogDB({
    column: {
      name: 'raw_product_data',
      type: 'jsonb',
    },
  })
  @inputDataMapping({
    isCustomLogic: true,
    dataFile: DataFileType.PRODUCT,
    valuePath: '*** entire product shape file geo json ***',
  })
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  //#endregion
  public rawProductData: GeoJSON | undefined = undefined;

  //#region RASTER: productBoundingBox
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:productBBox',
    queryableField: 'mc:productBBox',
    pycswField: 'pycsw:productBBox',
  })
  @catalogDB({
    column: {
      name: 'product_bbox',
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
  //#endregion
  public productBoundingBox: string | undefined = undefined;

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
