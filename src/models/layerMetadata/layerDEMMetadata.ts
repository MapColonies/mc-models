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
import { DataType, NoDataValue, RecordType, UndulationModel, Units, VerticalDatum } from '../pycsw/coreEnums';
import { IMetadataCommonModel } from './interfaces/metadataCommonModel';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { getCatalogDBMapping, ICatalogDBMapping, catalogDB } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';
import { ProductType, SensorType } from './enums';

export interface ILayerMetadata {
  resolutionDegree: number | undefined;
  resolutionMeter: number | undefined;
  absoluteAccuracyLEP90: number | undefined;
  relativeAccuracyLEP90: number | undefined;
  layerPolygonParts: GeoJSON | undefined;
  productBoundingBox: string | undefined;
  heightRangeFrom: number | undefined;
  heightRangeTo: number | undefined;
  verticalDatum: VerticalDatum | undefined;
  geographicArea: string | undefined;
  undulationModel: UndulationModel | undefined;
  dataType: DataType | undefined;
  noDataValue: NoDataValue | undefined;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class LayerDemMetadata implements ILayerMetadata, IMetadataCommonModel {
  //#region COMMON FIELDS
  //#region COMMON: type
  @pycsw({
    profile: 'mc_dem',
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
  public type: RecordType | undefined = RecordType.RECORD_DEM;

  //#region COMMON: classification
  @pycsw({
    profile: 'mc_dem',
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
    profile: 'mc_dem',
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
  public productName: string | undefined = undefined;

  //#region COMMON: description
  @pycsw({
    profile: 'mc_dem',
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
  })
  //#endregion
  public description: string | undefined = undefined;

  //#region COMMON: srsId
  @pycsw({
    profile: 'mc_dem',
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

  //#region COMMON: srsName
  @pycsw({
    profile: 'mc_dem',
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

  //#region COMMON: producerName
  @pycsw({
    profile: 'mc_dem',
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
  })
  //#endregion
  public producerName: string | undefined = undefined;

  //#region COMMON: updateDate
  @pycsw({
    profile: 'mc_dem',
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
    profile: 'mc_dem',
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
    profile: 'mc_dem',
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

  //#region COMMON: sensorType    //sensors
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:sensors',
    queryableField: 'mc:sensors',
    pycswField: 'pycsw:sensorType',
  })
  @catalogDB({
    column: {
      name: 'sensor_type',
      type: 'text',
      nullable: true,
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
  })
  //#endregion
  public sensorType: SensorType[] | undefined = undefined;

  //#region COMMON: region
  @pycsw({
    profile: 'mc_dem',
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public region: string | undefined = undefined;

  //#region COMMON: productId
  @pycsw({
    profile: 'mc_dem',
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

  //#region COMMON: productType
  @pycsw({
    profile: 'mc_dem',
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
  public productType: ProductType | undefined = undefined;

  //#region COMMON: footprint
  @pycsw({
    profile: 'mc_dem',
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
  //#endregion

  //#region DEM SPECIFIC FIELDS
  //#region DEM: absoluteAccuracyLEP90
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:absoluteAccuracyLEP90',
    queryableField: 'mc:absoluteAccuracyLEP90',
    pycswField: 'pycsw:absoluteAccuracyLEP90',
  })
  @catalogDB({
    column: {
      name: 'absolute_accuracy_lep_90',
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
    infoMsgCode: ['info-general-tooltip.required'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
    ],
  })
  //#endregion
  public absoluteAccuracyLEP90: number | undefined = undefined;

  //#region DEM: relativeAccuracyLEP90
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:relativeAccuracyLEP90',
    queryableField: 'mc:relativeAccuracyLEP90',
    pycswField: 'pycsw:relativeAccuracyLEP90',
  })
  @catalogDB({
    column: {
      name: 'relative_accuracy_lep_90',
      type: 'real',
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
  public relativeAccuracyLEP90: number | undefined = undefined;

  //#region DEM: resolutionDegree
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:resolutionDeg',
    queryableField: 'mc:resolutionDeg',
    pycswField: 'pycsw:resolutionDeg',
  })
  @catalogDB({
    column: {
      name: 'resolution_degree',
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
    infoMsgCode: ['info-field-tooltip.resolutionDegree.min', 'info-field-tooltip.resolutionDegree.max'],
    validation: [
      {
        errorMsgCode: 'validation-field.resolutionDegree.min',
        valueType: 'value',
        min: 0.00000009,
      },
      {
        errorMsgCode: 'validation-field.resolutionDegree.max',
        valueType: 'value',
        max: 0.072,
      },
    ],
  })
  //#endregion
  public resolutionDegree: number | undefined = undefined;

  //#region DEM: resolutionMeter
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:resolutionMeter',
    queryableField: 'mc:resolutionMeter',
    pycswField: 'pycsw:resolutionMeter',
  })
  @catalogDB({
    column: {
      name: 'resolution_meter',
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
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.resolutionMeter.min', 'info-field-tooltip.resolutionMeter.max'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.resolutionMeter.min',
        valueType: 'value',
        min: 0.01,
      },
      {
        errorMsgCode: 'validation-field.resolutionMeter.max',
        valueType: 'value',
        max: 8000,
      },
    ],
  })
  //#endregion
  public resolutionMeter: number | undefined = undefined;

  //#region DEM: layerPolygonParts
  @pycsw({
    profile: 'mc_dem',
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

  //#region DEM: productBoundingBox
  @pycsw({
    profile: 'mc_dem',
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
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isAutoGenerated: true,
  })
  //#endregion
  public productBoundingBox: string | undefined = undefined;

  //#region DEM: heightRangeFrom
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:heightRangeFrom',
    queryableField: 'mc:heightRangeFrom',
    pycswField: 'pycsw:heightRangeFrom',
  })
  @catalogDB({
    column: {
      name: 'height_range_from',
      type: 'real',
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
    category: FieldCategory.GEO_INFO,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.heightRangeFrom.max', 'info-field-tooltip.heightRangeFrom.min'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.heightRangeFrom.max',
        valueType: 'field',
        max: 'heightRangeTo',
      },
      {
        errorMsgCode: 'validation-field.heightRangeFrom.min',
        valueType: 'value',
        min: -500,
      },
      {
        errorMsgCode: 'validation-field.heightRangeFrom.max',
        valueType: 'value',
        max: 9000,
      },
    ],
  })
  //#endregion
  public heightRangeFrom: number | undefined = undefined;

  //#region DEM: heightRangeTo
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:heightRangeTo',
    queryableField: 'mc:heightRangeTo',
    pycswField: 'pycsw:heightRangeTo',
  })
  @catalogDB({
    column: {
      name: 'height_range_to',
      type: 'real',
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
    category: FieldCategory.GEO_INFO,
    infoMsgCode: ['info-general-tooltip.required', 'info-field-tooltip.heightRangeTo.max', 'info-field-tooltip.heightRangeTo.min'],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
      {
        errorMsgCode: 'validation-field.heightRangeTo.min',
        valueType: 'value',
        min: -500,
      },
      {
        errorMsgCode: 'validation-field.heightRangeTo.max',
        valueType: 'value',
        max: 9000,
      },
    ],
  })
  //#endregion
  public heightRangeTo: number | undefined = undefined;

  //#region DEM: verticalDatum
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:verticalDatum',
    queryableField: 'mc:verticalDatum',
    pycswField: 'pycsw:verticalDatum',
  })
  @catalogDB({
    column: {
      name: 'vertical_datum',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.VERTICAL_DATUM,
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
  public verticalDatum: VerticalDatum | undefined = undefined;

  //#region DEM: units
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:units',
    queryableField: 'mc:units',
    pycswField: 'pycsw:units',
  })
  @catalogDB({
    column: {
      name: 'units',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.UNITS,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
  })
  //#endregion
  public units: Units | undefined = undefined;

  //#region DEM: geographicArea
  @pycsw({
    profile: 'mc_dem',
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
  //#endregion
  public geographicArea: string | undefined = undefined;

  //#region DEM: undulationModel
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:undulationModel',
    queryableField: 'mc:undulationModel',
    pycswField: 'pycsw:undulationModel',
  })
  @catalogDB({
    column: {
      name: 'undulation_model',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.UNDULATION_MODEL,
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
  public undulationModel: UndulationModel | undefined = undefined;

  //#region DEM: dataType
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:dataType',
    queryableField: 'mc:dataType',
    pycswField: 'pycsw:dataType',
  })
  @catalogDB({
    column: {
      name: 'data_type',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATATYPE,
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
  public dataType: DataType | undefined = undefined;

  //#region DEM: noDataValue
  @pycsw({
    profile: 'mc_dem',
    xmlElement: 'mc:noDataValue',
    queryableField: 'mc:noDataValue',
    pycswField: 'pycsw:noDataValue',
  })
  @catalogDB({
    column: {
      name: 'no_data_value',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.NO_DATA_VALUE,
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
  public noDataValue: NoDataValue | undefined = undefined;
  //#endregion

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<LayerDemMetadata>(new LayerDemMetadata(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping<LayerDemMetadata>(new LayerDemMetadata(), prop);
  }

  public static getFieldConfig(prop: string): IFieldConfigInfo | undefined {
    return getFieldConfig<LayerDemMetadata>(new LayerDemMetadata(), prop);
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new LayerDemMetadata();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<LayerDemMetadata>(layer, prop);
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
    const layer = new LayerDemMetadata();
    for (const prop in layer) {
      const catalogDbMap = getCatalogDBMapping<LayerDemMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<LayerDemMetadata>(layer, prop);
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

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const layer = new LayerDemMetadata();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<LayerDemMetadata>(layer, prop);
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
