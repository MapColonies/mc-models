import { GeoJSON } from 'geojson';
import { RecordType, ProductType, RecordStatus } from '@map-colonies/types';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import {
  FieldCategory,
  fieldConfig,
  getFieldConfig,
  IFieldConfigInfo,
  IPropFieldConfigInfo,
} from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { IMetadataCommonModel } from './interfaces/metadataCommonModel';
import { catalogDB, getCatalogDBMapping, ICatalogDBMapping, ORMColumnType } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';
import { IPropSHPMapping } from './decorators/property/shp.decorator';

export interface IQuantizedMeshBestMetadata {
  // Based on 3D Entity fields
  srsId: string | undefined;
  productVersion: number | undefined;
  creationDate: Date | undefined;
  minResolutionMeter: number | undefined;
  maxResolutionMeter: number | undefined;
  maxAccuracyCE90: number | undefined;
  // absoluteAccuracyLE90: number | undefined;
  // accuracySE90: number | undefined;
  // relativeAccuracySE90: number | undefined;
  // visualAccuracy: number | undefined;
  heightRangeFrom: number | undefined;
  heightRangeTo: number | undefined;
  productionSystem: string | undefined;
  productionSystemVer: string | undefined;
  // minFlightAlt: number | undefined;
  // maxFlightAlt: number | undefined;
  geographicArea: string | undefined;
  productBoundingBox: string | undefined;
  productSource: string | undefined;
  productStatus: RecordStatus | undefined;
  sourceDateStart: Date | undefined;
  sourceDateEnd: Date | undefined;
  updateDate: Date | undefined;

  // Description field must include info:
  // undulationModel: UndulationModel | undefined;
  // noDataValue: NoDataValue | undefined;
  // verticalDatum: VerticalDatum | undefined;
  // layerPolygonParts: GeoJSON | undefined;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class QuantizedMeshBestMetadata implements IQuantizedMeshBestMetadata, IMetadataCommonModel {
  //#region QUANTIZED_MESH_BEST SPECIFIC FIELDS

  //#region QUANTIZED_MESH_BEST: type
  @pycsw({
    profile: 'mc_quantized_mesh_best',
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
  public type: RecordType | undefined = RecordType.RECORD_3D;

  //#region QUANTIZED_MESH_BEST: productId
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productId',
    queryableField: 'mc:productId',
    pycswField: 'pycsw:productId',
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
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public productId: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: productName
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productName',
    queryableField: 'mc:productName',
    pycswField: 'pycsw:title',
  })
  @catalogDB({
    column: {
      name: 'product_name',
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

  //#region QUANTIZED_MESH_BEST: productVersion
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productVersion',
    queryableField: 'mc:productVersion',
    pycswField: 'pycsw:productVersion',
  })
  @catalogDB({
    column: {
      name: 'product_version',
      type: 'int',
      nullable: false,
    },
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
  public productVersion: number | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: productType
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productType',
    queryableField: 'mc:productType',
    pycswField: 'pycsw:productType',
  })
  @catalogDB({
    column: {
      name: 'product_type',
      type: 'text',
      nullable: false,
    },
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
  public productType: ProductType | undefined = ProductType.PHOTO_REALISTIC_3D;

  //#region QUANTIZED_MESH_BEST: description
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:description',
    queryableField: 'mc:description',
    pycswField: 'pycsw:abstract',
  })
  @catalogDB({
    column: {
      name: 'description',
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
    isManuallyEditable: true,
  })
  //#endregion
  public description: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: creationDate
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:creationDateUTC',
    queryableField: 'mc:creationDateUTC',
    pycswField: 'pycsw:creationDate',
  })
  @catalogDB({
    column: {
      name: 'creation_date',
      type: 'timestamp without time zone',
      nullable: true,
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
    isManuallyEditable: true,
    infoMsgCode: ['info-field-tooltip.creationDate.tooltip'],
  })
  //#endregion
  public creationDate: Date | undefined = undefined;

  //#region COMMON: updateDate
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:updateDateUTC',
    queryableField: 'mc:updateDateUTC',
    pycswField: 'pycsw:updateDate',
  })
  @catalogDB({
    column: {
      name: 'update_date',
      type: 'timestamp without time zone',
      nullable: true,
      columnType: ORMColumnType.UPDATE_DATE_COLUMN,
    },
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

  //#region QUANTIZED_MESH_BEST: sourceDateStart
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:imagingTimeBeginUTC',
    queryableField: 'mc:imagingTimeBeginUTC',
    pycswField: 'pycsw:tempExtentBegin',
  })
  @catalogDB({
    column: {
      name: 'source_start_date',
      type: 'timestamp without time zone',
      nullable: false,
    },
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

  //#region QUANTIZED_MESH_BEST: sourceDateEnd
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:imagingTimeEndUTC',
    queryableField: 'mc:imagingTimeEndUTC',
    pycswField: 'pycsw:tempExtentEnd',
  })
  @catalogDB({
    column: {
      name: 'source_end_date',
      type: 'timestamp without time zone',
      nullable: false,
    },
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

  //#region QUANTIZED_MESH_BEST: minResolutionMeter
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:minResolutionMeter',
    queryableField: 'mc:minResolutionMeter',
    pycswField: 'pycsw:minResolution',
  })
  @catalogDB({
    column: {
      name: 'min_resolution',
      type: 'real',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isManuallyEditable: true,
    infoMsgCode: ['info-field-tooltip.meter.tooltip', 'info-field-tooltip.minResolutionMeter.min', 'info-field-tooltip.minResolutionMeter.max'],
    validation: [
      {
        errorMsgCode: 'validation-field.minResolutionMeter.min',
        valueType: 'value',
        min: 0.01,
      },
      {
        errorMsgCode: 'validation-field.minResolutionMeter.max',
        valueType: 'value',
        max: 8000,
      },
    ],
  })
  //#endregion
  public minResolutionMeter: number | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: maxResolutionMeter
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:maxResolutionMeter',
    queryableField: 'mc:maxResolutionMeter',
    pycswField: 'pycsw:maxResolution',
  })
  @catalogDB({
    column: {
      name: 'max_resolution',
      type: 'real',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    isManuallyEditable: true,
    infoMsgCode: ['info-field-tooltip.meter.tooltip', 'info-field-tooltip.maxResolutionMeter.min', 'info-field-tooltip.maxResolutionMeter.max'],
    validation: [
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

  //#region QUANTIZED_MESH_BEST: maxAccuracyCE90
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:maxHorizontalAccuracyCE90',
    queryableField: 'mc:maxHorizontalAccuracyCE90',
    pycswField: 'pycsw:horizontalAccuracyCE90',
  })
  @catalogDB({
    column: {
      name: 'horizontal_accuracy_ce_90',
      type: 'real',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isManuallyEditable: true,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.maxAccuracyCE90.min', 'info-field-tooltip.maxAccuracyCE90.max'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.maxAccuracyCE90.min',
        valueType: 'value',
        min: 0,
      },
      {
        errorMsgCode: 'validation-field.maxAccuracyCE90.max',
        valueType: 'value',
        max: 999,
      },
    ],
  })
  //#endregion
  public maxAccuracyCE90: number | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: sensors
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:sensors',
    queryableField: 'mc:sensors',
    pycswField: 'pycsw:sensorType',
  })
  @catalogDB({
    column: {
      name: 'sensor_type',
      type: 'text',
      nullable: false,
    },
    field: {
      overrideType: TsTypes.STRING,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING_ARRAY,
  })
  @graphql({
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
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

  //#region QUANTIZED_MESH_BEST: footprint
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:footprint',
    queryableField: 'mc:footprint',
    pycswField: 'pycsw:footprint',
  })
  @catalogDB({
    column: {
      name: 'footprint',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  @graphql({
    nullable: false,
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
  public footprint: GeoJSON | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: heightRangeFrom
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:heightRangeFrom',
    queryableField: 'mc:heightRangeFrom',
    pycswField: 'pycsw:heightRangeFrom',
  })
  @catalogDB({
    column: {
      name: 'height_range_from',
      type: 'real',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isManuallyEditable: true,
    infoMsgCode: ['info-field-tooltip.meter.tooltip'],
  })
  //#endregion
  public heightRangeFrom: number | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: heightRangeTo
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:heightRangeTo',
    queryableField: 'mc:heightRangeTo',
    pycswField: 'pycsw:heightRangeTo',
  })
  @catalogDB({
    column: {
      name: 'height_range_to',
      type: 'real',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isManuallyEditable: true,
    infoMsgCode: ['info-field-tooltip.meter.tooltip'],
  })
  //#endregion
  public heightRangeTo: number | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: srsId
  @pycsw({
    profile: 'mc_quantized_mesh_best',
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
    default: '4326',
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public srsId: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: srsName
  @pycsw({
    profile: 'mc_quantized_mesh_best',
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
    default: 'WGS84GEO',
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public srsName: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: region
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:region',
    queryableField: 'mc:region',
    pycswField: 'pycsw:region',
  })
  @catalogDB({
    column: {
      name: 'region',
      type: 'text',
      nullable: false,
    },
    field: {
      overrideType: TsTypes.STRING,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING_ARRAY,
  })
  @graphql({
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    infoMsgCode: ['info-field-tooltip.region.tooltip', 'info-general-tooltip.required'],
    isMultiSelection: true,
    lookupTable: 'countries',
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public region: string[] | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: classification
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:classification',
    queryableField: 'mc:classification',
    pycswField: 'pycsw:classification',
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
    infoMsgCode: ['info-general-tooltip.required'],
    lookupTable: 'classification',
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public classification: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: productionSystem
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productionSystem',
    queryableField: 'mc:productionSystem',
    pycswField: 'pycsw:productionSystem',
  })
  @catalogDB({
    column: {
      name: 'production_system',
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public productionSystem: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: productionSystemVer
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productionSystemVersion',
    queryableField: 'mc:productionSystemVersion',
    pycswField: 'pycsw:productionSystemVersion',
  })
  @catalogDB({
    column: {
      name: 'production_system_version',
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public productionSystemVer: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: producerName
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:producerName',
    queryableField: 'mc:producerName',
    pycswField: 'pycsw:creator',
  })
  @catalogDB({
    column: {
      name: 'producer_name',
      type: 'text',
      default: 'IDFMU',
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
    default: 'IDFMU',
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public producerName: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: geographicArea
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:geographicArea',
    queryableField: 'mc:geographicArea',
    pycswField: 'pycsw:geographicArea',
  })
  @catalogDB({
    column: {
      name: 'geographic_area',
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
    isManuallyEditable: true,
  })
  //#endregion
  public geographicArea: string | undefined = undefined;

  //#region QUANTIZED_MESH_BEST: productBoundingBox
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productBBox',
    queryableField: 'mc:productBBox',
    pycswField: 'pycsw:productBBox',
  })
  @catalogDB({
    column: {
      name: 'product_bbox',
      type: 'text',
      nullable: false,
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
    isAutoGenerated: true,
  })
  //#endregion
  public productBoundingBox: string | undefined = undefined;
  //#endregion

  //#region QUANTIZED_MESH_BEST: productSource
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productSource',
    queryableField: 'mc:productSource',
    pycswField: 'pycsw:productSource',
  })
  @catalogDB({
    column: {
      name: 'product_source',
      type: 'text',
      nullable: false,
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
    isAutoGenerated: true,
  })
  //#endregion
  public productSource: string | undefined = undefined;
  //#endregion

  //#region QUANTIZED_MESH_BEST: productStatus
  @pycsw({
    profile: 'mc_quantized_mesh_best',
    xmlElement: 'mc:productStatus',
    queryableField: 'mc:productStatus',
    pycswField: 'pycsw:productStatus',
  })
  @catalogDB({
    column: {
      name: 'product_status',
      type: 'text',
      default: RecordStatus.UNPUBLISHED,
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.RECORD_STATUS,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    default: RecordStatus.UNPUBLISHED,
  })
  //#endregion
  public productStatus: RecordStatus | undefined = RecordStatus.UNPUBLISHED;
  //#endregion

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<QuantizedMeshBestMetadata>(new QuantizedMeshBestMetadata(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping<QuantizedMeshBestMetadata>(new QuantizedMeshBestMetadata(), prop);
  }

  public static getFieldConfig(prop: string): IFieldConfigInfo | undefined {
    return getFieldConfig<QuantizedMeshBestMetadata>(new QuantizedMeshBestMetadata(), prop);
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new QuantizedMeshBestMetadata();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<QuantizedMeshBestMetadata>(layer, prop);
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
    const layer = new QuantizedMeshBestMetadata();
    for (const prop in layer) {
      const catalogDbMap = getCatalogDBMapping<QuantizedMeshBestMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<QuantizedMeshBestMetadata>(layer, prop);
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

  public static getShpMappings(): IPropSHPMapping[] {
    return [];
  }

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const layer = new QuantizedMeshBestMetadata();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<QuantizedMeshBestMetadata>(layer, prop);
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
