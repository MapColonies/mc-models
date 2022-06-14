import { GeoJSON } from 'geojson';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import {
  FieldCategory,
  fieldConfig,
  getFieldConfig,
  IFieldConfigInfo,
  IPropFieldConfigInfo,
} from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { RecordType } from '../pycsw/coreEnums';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';
import { ProductType } from './enums';
import { catalogDB } from './decorators/property/catalogDB.decorator';
import { IMetadataCommonModel } from './interfaces/metadataCommonModel';

export interface ILayer3DMetadata {
  productVersion: number | undefined;
  creationDate: Date | undefined;
  minResolutionMeter: number | undefined;
  maxResolutionMeter: number | undefined;
  nominalResolution: number | undefined;
  maxAccuracyCE90: number | undefined;
  absoluteAccuracyLEP90: number | undefined;
  accuracySE90: number | undefined;
  relativeAccuracyLEP90: number | undefined;
  visualAccuracy: number | undefined;
  heightRangeFrom: number | undefined;
  heightRangeTo: number | undefined;
  srsOrigin: string | undefined;
  productionSystem: string | undefined;
  productionSystemVer: string | undefined;
  productionMethod: string | undefined;
  minFlightAlt: number | undefined;
  maxFlightAlt: number | undefined;
  geographicArea: string | undefined;
  productBoundingBox: string | undefined;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class Layer3DMetadata implements ILayer3DMetadata, IMetadataCommonModel {
  //#region 3D SPECIFIC FIELDS
  //#region 3D: type
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: productId
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: productName
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: productVersion
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: productType
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: description
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: creationDate
  @pycsw({
    profile: 'mc3d',
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
    profile: 'mc3d',
    xmlElement: 'mc:updateDateUTC',
    queryableField: 'mc:updateDateUTC',
    pycswField: 'pycsw:UpdateDate',
  })
  @catalogDB({
    column: {
      name: 'update_date',
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
    infoMsgCode: ['info-field-tooltip.updateDate.tooltip'],
  })
  //#endregion
  public updateDate: Date | undefined = undefined;

  //#region 3D: sourceDateStart
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: sourceDateEnd
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: minResolutionMeter
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: maxResolutionMeter
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: nominalResolution
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:nominalResolution',
    queryableField: 'mc:nominalResolution',
    pycswField: 'pycsw:nominalResolution',
  })
  @catalogDB({
    column: {
      name: 'nominal_resolution',
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
  })
  //#endregion
  public nominalResolution: number | undefined = undefined;

  //#region 3D: maxAccuracyCE90
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: absoluteAccuracyLEP90
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:accuracyLEP90',
    queryableField: 'mc:accuracyLEP90',
    pycswField: 'pycsw:accuracyLE90',
  })
  @catalogDB({
    column: {
      name: 'accuracy_le_90',
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
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.absoluteAccuracyLEP90.min', 'info-field-tooltip.absoluteAccuracyLEP90.max'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.absoluteAccuracyLEP90.min',
        valueType: 'value',
        min: 0,
      },
      {
        errorMsgCode: 'validation-field.absoluteAccuracyLEP90.max',
        valueType: 'value',
        max: 999,
      },
    ],
  })
  //#endregion
  public absoluteAccuracyLEP90: number | undefined = undefined;

  //#region 3D: accuracySE90
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:accuracySE90',
    queryableField: 'mc:accuracySE90',
    pycswField: 'pycsw:accuracySE90',
  })
  @catalogDB({
    column: {
      name: 'accuracy_se_90',
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
    infoMsgCode: ['info-field-tooltip.accuracySE90.min', 'info-field-tooltip.accuracySE90.max'],
    validation: [
      {
        errorMsgCode: 'validation-field.accuracySE90.min',
        valueType: 'value',
        min: 0,
      },
      {
        errorMsgCode: 'validation-field.accuracySE90.max',
        valueType: 'value',
        max: 250,
      },
    ],
  })
  //#endregion
  public accuracySE90: number | undefined = undefined;

  //#region 3D: relativeAccuracyLEP90
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:relativeAccuracyLE90',
    queryableField: 'mc:relativeAccuracyLE90',
    pycswField: 'pycsw:relativeAccuracyLE90',
  })
  @catalogDB({
    column: {
      name: 'relative_accuracy_le_90',
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
    infoMsgCode: ['info-field-tooltip.relativeAccuracyLEP90.min', 'info-field-tooltip.relativeAccuracyLEP90.max'],
    validation: [
      {
        errorMsgCode: 'validation-field.relativeAccuracyLEP90.min',
        valueType: 'value',
        min: 0,
      },
      {
        errorMsgCode: 'validation-field.relativeAccuracyLEP90.max',
        valueType: 'value',
        max: 100,
      },
    ],
  })
  //#endregion
  public relativeAccuracyLEP90: number | undefined = undefined;

  //#region 3D: visualAccuracy
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:visualAccuracy',
    queryableField: 'mc:visualAccuracy',
    pycswField: 'pycsw:visualAccuracy',
  })
  @catalogDB({
    column: {
      name: 'visual_accuracy',
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
    infoMsgCode: ['info-field-tooltip.visualAccuracy.min', 'info-field-tooltip.visualAccuracy.max'],
    validation: [
      {
        errorMsgCode: 'validation-field.visualAccuracy.min',
        valueType: 'value',
        min: 0,
      },
      {
        errorMsgCode: 'validation-field.visualAccuracy.max',
        valueType: 'value',
        max: 100,
      },
    ],
  })
  //#endregion
  public visualAccuracy: number | undefined = undefined;

  //#region 3D: sensors
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: footprint
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: heightRangeFrom
  @pycsw({
    profile: 'mc3d',
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
    infoMsgCode: ['info-field-tooltip.meter.tooltip'],
  })
  //#endregion
  public heightRangeFrom: number | undefined = undefined;

  //#region 3D: heightRangeTo
  @pycsw({
    profile: 'mc3d',
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
    infoMsgCode: ['info-field-tooltip.meter.tooltip'],
  })
  //#endregion
  public heightRangeTo: number | undefined = undefined;

  //#region 3D: srsId
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: srsName
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: srsOrigin
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:SRSOrigin',
    queryableField: 'mc:SRSOrigin',
    pycswField: 'pycsw:CRSOrigin',
  })
  @catalogDB({
    column: {
      name: 'srs_origin',
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
  public srsOrigin: string | undefined = undefined;

  //#region 3D: region
  @pycsw({
    profile: 'mc3d',
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
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public region: string[] | undefined = undefined;

  //#region 3D: classification
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: productionSystem
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: productionSystemVer
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: producerName
  @pycsw({
    profile: 'mc3d',
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
  public producerName: string | undefined = undefined;

  //#region 3D: productionMethod
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:productionMethod',
    queryableField: 'mc:productionMethod',
    pycswField: 'pycsw:productionMethod',
  })
  @catalogDB({
    column: {
      name: 'production_method',
      type: 'text',
      default: 'photogrammetric',
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
  public productionMethod: string | undefined = undefined;

  //#region 3D: minFlightAlt
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:minFlightAlt',
    queryableField: 'mc:minFlightAlt',
    pycswField: 'pycsw:minFlightAlt',
  })
  @catalogDB({
    column: {
      name: 'min_flight_alt',
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
    infoMsgCode: ['info-field-tooltip.meter.tooltip'],
  })
  //#endregion
  public minFlightAlt: number | undefined = undefined;

  //#region 3D: maxFlightAlt
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:maxFlightAlt',
    queryableField: 'mc:maxFlightAlt',
    pycswField: 'pycsw:maxFlightAlt',
  })
  @catalogDB({
    column: {
      name: 'max_flight_alt',
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
    infoMsgCode: ['info-field-tooltip.meter.tooltip'],
  })
  //#endregion
  public maxFlightAlt: number | undefined = undefined;

  //#region 3D: geographicArea
  @pycsw({
    profile: 'mc3d',
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

  //#region 3D: productBoundingBox
  @pycsw({
    profile: 'mc3d',
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

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<Layer3DMetadata>(new Layer3DMetadata(), prop);
  }

  public static getFieldConfig(prop: string): IFieldConfigInfo | undefined {
    return getFieldConfig<Layer3DMetadata>(new Layer3DMetadata(), prop);
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new Layer3DMetadata();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<Layer3DMetadata>(layer, prop);
      if (pycswMap) {
        ret.push({
          prop: prop,
          ...pycswMap,
        });
      }
    }
    return ret;
  }

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const layer = new Layer3DMetadata();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<Layer3DMetadata>(layer, prop);
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
