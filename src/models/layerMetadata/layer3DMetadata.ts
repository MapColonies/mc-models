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
import { ProductType, SensorType } from './enums';
import { catalogDB } from './decorators/property/catalogDB.decorator';

export interface ILayer3DMetadata {
  type: RecordType | undefined;

  productId: string | undefined;
  productName: string | undefined;
  productVersion: number | undefined;
  productType: ProductType | undefined;
  description: string | undefined;
  creationDate: Date | undefined;
  sourceDateStart: Date | undefined;
  sourceDateEnd: Date | undefined;
  srsId: string | undefined;
  producerName: string | undefined;
  insertDate: Date | undefined;
  maxAccuracyCE90: number | undefined;
  sensors: SensorType[] | undefined;
  region: string | undefined;
  classification: string | undefined;
  footprint: GeoJSON | undefined;
  relativeAccuracyLEP90: number | undefined;
  nominalResolution: number | undefined;
  absoluteAccuracyLEP90: number | undefined;
  accuracySE90: number | undefined;
  visualAccuracy: number | undefined;
  heightRangeFrom: number | undefined;
  heightRangeTo: number | undefined;
  srsOrigin: string | undefined;
  minFlightAlt: number | undefined;
  maxFlightAlt: number | undefined;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class Layer3DMetadata implements ILayer3DMetadata {
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
      nullable: true,
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
      type: 'text',
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
      nullable: true,
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
  })
  //#endregion
  public creationDate: Date | undefined = undefined;

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
    isRequired: true,
  })
  //#endregion
  public srsId: string | undefined = undefined;

  //#region 3D: producerName
  @pycsw({
    profile: 'mc3d',
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
    isRequired: true,
    isAutoGenerated: true,
  })
  //#endregion
  public producerName: string | undefined = undefined;

  //#region 3D: insertDate
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:insertDate',
    queryableField: 'mc:insertDate',
    pycswField: 'pycsw:InsertDate',
  })
  @catalogDB({
    column: {
      name: 'insert_date',
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
  public insertDate: Date | undefined = undefined;

  //#region 3D: maxAccuracyCE90
  @pycsw({
    profile: 'mc3d',
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
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isRequired: true,
  })
  //#endregion
  public maxAccuracyCE90: number | undefined = undefined;

  //#region 3D: sensors
  @pycsw({
    profile: 'mc3d',
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
  @tsTypes({
    mappingType: TsTypes.SENSORTYPE_ARRAY,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
    isRequired: true,
  })
  //#endregion
  public sensors: SensorType[] | undefined = undefined;

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
    isRequired: true,
  })
  //#endregion
  public region: string | undefined = undefined;

  //#region 3D: classification
  @pycsw({
    profile: 'mc3d',
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
    isRequired: true,
  })
  //#endregion
  public classification: string | undefined = undefined;

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
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public footprint: GeoJSON | undefined = undefined;

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
  public relativeAccuracyLEP90: number | undefined = undefined;

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
      type: 'text',
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

  //#region 3D: absoluteAccuracyLEP90
  @pycsw({
    profile: 'mc3d',
    xmlElement: 'mc:accuracyLE90',
    queryableField: 'mc:accuracyLE90',
    pycswField: 'pycsw:accuracyLE90',
  })
  @catalogDB({
    column: {
      name: 'accuracy_le_90',
      type: 'text',
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
    isRequired: true,
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
      type: 'text',
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
  public accuracySE90: number | undefined = undefined;

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
      type: 'text',
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
  public visualAccuracy: number | undefined = undefined;

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
      type: 'text',
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
      type: 'text',
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
  public heightRangeTo: number | undefined = undefined;

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
  //#endregion
  public srsOrigin: string | undefined = undefined;

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
      type: 'text',
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
      type: 'text',
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
  public maxFlightAlt: number | undefined = undefined;
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
