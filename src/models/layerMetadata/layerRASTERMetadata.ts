import { keys } from 'ts-transformer-keys';
import { NewRasterLayerMetadata, UpdateRasterLayerMetadata, RasterLayerMetadata, Transparency, TileOutputFormat } from '@map-colonies/raster-shared';
import { GeoJSON } from 'geojson';
import { TilesMimeFormat, RecordType, ProductType } from '@map-colonies/types';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import {
  FieldCategory,
  fieldConfig,
  getFieldConfig,
  IFieldConfigInfo,
  IPropFieldConfigInfo,
} from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { VALIDATIONS } from '../raster/constants';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { getInputDataMapping, IDataMapping, IPropSHPMapping } from './decorators/property/shp.decorator';
import { getCatalogDBMapping, ICatalogDBMapping, catalogDB, ORMColumnType } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';

const RASTER_LAYER_METADATA_PROPS = keys<RasterLayerMetadata>();
const NEW_RASTER_LAYER_METADATA_PROPS = keys<NewRasterLayerMetadata>();
const UPDATE_RASTER_LAYER_METADATA_PROPS = keys<UpdateRasterLayerMetadata>();

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class LayerMetadata implements RasterLayerMetadata {
  public constructor() {
    const DUMMY_VALUE_STRING = 'DUMMY_VALUE';
    const DUMMY_VALUE_NUMBER = 0;
    const DUMMY_VALUE_TRANSPARENCY = Transparency.OPAQUE;
    const DUMMY_VALUE_TILE_OUTPUT_FORMAT = TileOutputFormat.JPEG;
    const DUMMY_VALUE_TILE_MIME_FORMAT = 'image/png';

    this.classification = DUMMY_VALUE_STRING;
    this.id = DUMMY_VALUE_STRING;
    this.srs = DUMMY_VALUE_STRING;
    this.productVersion = DUMMY_VALUE_STRING;
    this.maxResolutionDeg = DUMMY_VALUE_NUMBER;
    this.minResolutionDeg = DUMMY_VALUE_NUMBER;
    this.rms = DUMMY_VALUE_NUMBER;
    this.scale = DUMMY_VALUE_NUMBER;
    this.creationDateUTC = new Date();
    this.ingestionDate = new Date();
    this.minHorizontalAccuracyCE90 = DUMMY_VALUE_NUMBER;
    this.maxHorizontalAccuracyCE90 = DUMMY_VALUE_NUMBER;
    this.region = [DUMMY_VALUE_STRING];
    this.sensors = [DUMMY_VALUE_STRING];
    this.imagingTimeBeginUTC = new Date();
    this.imagingTimeEndUTC = new Date();
    this.updateDateUTC = new Date();
    this.maxResolutionMeter = DUMMY_VALUE_NUMBER;
    this.minResolutionMeter = DUMMY_VALUE_NUMBER;
    this.productSubType = DUMMY_VALUE_STRING;
    this.productBoundingBox = DUMMY_VALUE_STRING;
    this.displayPath = DUMMY_VALUE_STRING;
    this.transparency = DUMMY_VALUE_TRANSPARENCY;
    this.tileMimeFormat = DUMMY_VALUE_TILE_MIME_FORMAT;
    this.tileOutputFormat = DUMMY_VALUE_TILE_OUTPUT_FORMAT;
    this.type = RecordType.RECORD_RASTER;
    this.classification = DUMMY_VALUE_STRING;
    this.productName = DUMMY_VALUE_STRING;
    this.description = DUMMY_VALUE_STRING;
    this.srsName = DUMMY_VALUE_STRING;
    this.producerName = DUMMY_VALUE_STRING;
    this.sensors = [DUMMY_VALUE_STRING];
    this.region = [DUMMY_VALUE_STRING];
    this.productId = DUMMY_VALUE_STRING;
    this.productType = ProductType.ORTHOPHOTO;
  }
  //#region CORE: id
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:id',
    queryableField: 'mc:id',
    pycswField: 'pycsw:Identifier',
  })
  @catalogDB({
    column: {
      name: 'identifier',
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
  public id!: string;

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
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.RECORDTYPE,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public type: RecordType = RecordType.RECORD_RASTER;

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
    lookupTable: 'classification',
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public classification!: string;

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
  public productName!: string;

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

  //#region COMMON: srs
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
  public srs!: string;

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
    nullable: false,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
    default: 'IDFMU',
  })
  //#endregion
  public producerName: string | undefined = undefined;

  //#region COMMON: creationDateUTC
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:creationDateUTC',
    queryableField: 'mc:creationDateUTC',
    pycswField: 'pycsw:CreationDate',
  })
  @catalogDB({
    column: {
      name: 'creation_date_utc',
      type: 'timestamp without time zone',
      nullable: false,
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
    isLifecycleEnvolved: true,
  })
  //#endregion
  public creationDateUTC?: Date;

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
      nullable: false,
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
  })
  //#endregion
  public ingestionDate?: Date;

  //#region COMMON: updateDateUTC
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:updateDateUTC',
    queryableField: 'mc:updateDateUTC',
    pycswField: 'pycsw:UpdateDate',
  })
  @catalogDB({
    column: {
      name: 'update_date_utc',
      type: 'timestamp without time zone',
      columnType: ORMColumnType.UPDATE_DATE_COLUMN,
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
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
    infoMsgCode: ['info-field-tooltip.updateDate.tooltip'],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public updateDateUTC?: Date;

  //#region COMMON: imagingTimeBeginUTC
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:imagingTimeBeginUTC',
    queryableField: 'mc:imagingTimeBeginUTC',
    pycswField: 'pycsw:TempExtent_begin',
  })
  @catalogDB({
    column: {
      name: 'imaging_time_begin_utc',
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
        max: 'imagingTimeEndUTC',
      },
      {
        errorMsgCode: 'validation-field.sourceDateStart.max',
        valueType: 'field',
        max: '$NOW',
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public imagingTimeBeginUTC!: Date;

  //#region COMMON: imagingTimeEndUTC
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:imagingTimeEndUTC',
    queryableField: 'mc:imagingTimeEndUTC',
    pycswField: 'pycsw:TempExtent_end',
  })
  @catalogDB({
    column: {
      name: 'imaging_time_end_utc',
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
    isLifecycleEnvolved: true,
  })
  //#endregion
  public imagingTimeEndUTC!: Date;

  //#region COMMON: maxHorizontalAccuracyCE90
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:maxHorizontalAccuracyCE90',
    queryableField: 'mc:maxHorizontalAccuracyCE90',
    pycswField: 'pycsw:maxHorizontalAccuracyCE90',
  })
  @catalogDB({
    column: {
      name: 'max_horizontal_accuracy_ce_90',
      type: 'numeric',
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
    infoMsgCode: ['info-general-tooltip.required'], //is it required?
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.maxHorizontalAccuracyCE90.min',
        valueType: 'value',
        min: VALIDATIONS.horizontalAccuracyCE90.min,
      },
      {
        errorMsgCode: 'validation-field.maxHorizontalAccuracyCE90.max',
        valueType: 'value',
        max: VALIDATIONS.horizontalAccuracyCE90.max,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public maxHorizontalAccuracyCE90!: number;

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
      type: 'numeric',
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
  public minHorizontalAccuracyCE90!: number;

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
    isMultiSelection: true,
    lookupTable: 'countries',
    infoMsgCode: ['info-field-tooltip.region.tooltip', 'info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public region!: string[];
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
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-field-tooltip.productId.tooltip', 'info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.productId.pattern',
        valueType: 'value',
        pattern: VALIDATIONS.productId.pattern,
      },
    ],
  })
  //#endregion
  public productId!: string;

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
        pattern: VALIDATIONS.productVersion.pattern,
      },
    ],
  })
  //#endregion
  public productVersion!: string;

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
  public productType!: ProductType;

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
        min: VALIDATIONS.resolutionDeg.min,
      },
      {
        errorMsgCode: 'validation-field.maxResolutionDeg.max',
        valueType: 'value',
        max: VALIDATIONS.resolutionDeg.max,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public maxResolutionDeg!: number;

  //#region RASTER: min_resolution_deg
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:minResolutionDeg',
    queryableField: 'mc:minResolutionDeg',
    pycswField: 'pycsw:minResolutionDeg',
  })
  @catalogDB({
    column: {
      name: 'min_resolution_deg',
      type: 'numeric',
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
    category: FieldCategory.MAIN,
    infoMsgCode: [
      'info-field-tooltip.minResolutionDeg.tooltip',
      'info-general-tooltip.required',
      'info-field-tooltip.minResolutionDeg.min',
      'info-field-tooltip.minResolutionDeg.max',
    ],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.minResolutionDeg.min',
        valueType: 'value',
        min: VALIDATIONS.resolutionDeg.min,
      },
      {
        errorMsgCode: 'validation-field.minResolutionDeg.max',
        valueType: 'value',
        max: VALIDATIONS.resolutionDeg.max,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public minResolutionDeg!: number;

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
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.maxResolutionMeter.min', 'info-field-tooltip.maxResolutionMeter.max'],
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
    isLifecycleEnvolved: true,
  })
  //#endregion
  public maxResolutionMeter!: number;

  //#region RASTER: minResolutionMeter
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:minResolutionMeter',
    queryableField: 'mc:minResolutionMeter',
    pycswField: 'pycsw:minResolutionMeter',
  })
  @catalogDB({
    column: {
      name: 'min_resolution_meter',
      type: 'numeric',
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
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.minResolutionMeter.min', 'info-field-tooltip.minResolutionMeter.max'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.minResolutionMeter.min',
        valueType: 'value',
        min: VALIDATIONS.resolutionMeter.min,
      },
      {
        errorMsgCode: 'validation-field.minResolutionMeter.max',
        valueType: 'value',
        max: VALIDATIONS.resolutionMeter.max,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public minResolutionMeter!: number;

  //#region RASTER: rms
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:RMS',
    queryableField: 'mc:RMS',
    pycswField: 'pycsw:Rms',
  })
  @catalogDB({
    column: {
      name: 'rms',
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
  //#endregion
  public rms?: number;

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
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isManuallyEditable: true,
    infoMsgCode: ['info-field-tooltip.scale.min', 'info-field-tooltip.scale.max'],
    validation: [
      {
        errorMsgCode: 'validation-field.scale.min',
        valueType: 'value',
        min: 0,
      },
      {
        errorMsgCode: 'validation-field.scale.max',
        valueType: 'value',
        max: 100000000,
      },
    ],
    isLifecycleEnvolved: true,
  })
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
      {
        errorMsgCode: 'validation-field.footprint.json',
        json: true,
      },
    ],
    isLifecycleEnvolved: true,
  })
  //#endregion
  public footprint!: GeoJSON;

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

  //#region RASTER: dispalyPath
  @catalogDB({
    column: {
      name: 'display_path',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public displayPath!: string;

  //#region RASTER: transparency
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:transparency',
    queryableField: 'mc:transparency',
    pycswField: 'pycsw:transparency',
  })
  @catalogDB({
    column: {
      name: 'transparency',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.TRANSPARENCY,
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
  public transparency!: Transparency;

  //#region RASTER: tilesMimeFormat
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:tilesMimeFormat',
    queryableField: 'mc:tilesMimeFormat',
    pycswField: 'pycsw:tilesMimeFormat',
  })
  @catalogDB({
    column: {
      name: 'tile_mime_format',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public tileMimeFormat!: TilesMimeFormat;

  @catalogDB({
    column: {
      name: 'tile_output_format',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.TILE_OUTPUT_FORMAT,
  })
  //#endregion
  public tileOutputFormat!: TileOutputFormat;

  //#endregion

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<LayerMetadata>(new LayerMetadata(), prop);
  }

  public static getShpMapping(prop: string): IDataMapping[] | undefined {
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
    for (const prop of RASTER_LAYER_METADATA_PROPS) {
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

  public static getShpMappings(): IPropSHPMapping[] {
    const ret = [];
    const layer = new LayerMetadata();
    for (const prop of RASTER_LAYER_METADATA_PROPS) {
      const shpMap = getInputDataMapping<LayerMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<LayerMetadata>(layer, prop);
      if (shpMap && tsTypesMap) {
        ret.push({
          prop: prop,
          shapeFileMappings: [...shpMap],
          ...tsTypesMap,
        });
      }
    }
    return ret;
  }

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const layer = new LayerMetadata();
    for (const prop of RASTER_LAYER_METADATA_PROPS) {
      const fieldConfigMap = getFieldConfig<LayerMetadata>(layer, prop);
      if (fieldConfigMap) {
        ret.push({
          prop: prop,
          ...fieldConfigMap,
          isCreateEssential: NEW_RASTER_LAYER_METADATA_PROPS.find((p) => p === prop) !== undefined,
          isUpdateEssential: UPDATE_RASTER_LAYER_METADATA_PROPS.find((p) => p === prop) !== undefined,
        });
      }
    }
    return ret;
  }
}
