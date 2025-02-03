import { GeoJSON } from 'geojson';
import { RecordType, ProductType } from '@map-colonies/types';
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
import { getCatalogDBMapping, ICatalogDBMapping, catalogDB } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';
import { IPropSHPMapping } from './decorators/property/shp.decorator';

export interface IVectorBestMetadata {
  productVersion: string | undefined;
  // resolution: number | undefined;
  // rms: number | undefined;
  scale: string | undefined;

  // PROFILES COMMON FIELDS
  type: RecordType | undefined;
  classification: string | undefined;
  productName: string | undefined;
  description: string | undefined;
  srsId: string | undefined;
  srsName: string | undefined;
  producerName: string | undefined;
  updateDate: Date | undefined;
  //  sourceDateStart: Date | undefined;
  //  sourceDateEnd: Date | undefined;
  //  sensorType: SensorType[] | undefined; //sensors
  region: string[] | undefined;
  footprint: GeoJSON | undefined;
  //  productId: string | undefined;
  productType: ProductType | undefined;
  creationDate: Date | undefined;
  ingestionDate: Date | undefined;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class VectorBestMetadata implements IVectorBestMetadata {
  //#region COMMON FIELDS
  //#region COMMON: type
  @pycsw({
    profile: 'mc_vector_best',
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
    profile: 'mc_vector_best',
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
    isAutoGenerated: false,
    isManuallyEditable: true,
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

  //#region COMMON: productName
  @pycsw({
    profile: 'mc_vector_best',
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
    profile: 'mc_vector_best',
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

  //#region COMMON: srsId
  @pycsw({
    profile: 'mc_vector_best',
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
    default: '4326',
  })
  //#endregion
  public srsId: string | undefined = undefined;

  //#region COMMON: producerName
  @pycsw({
    profile: 'mc_vector_best',
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

  //#region COMMON: creationDate
  @pycsw({
    profile: 'mc_vector_best',
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
    profile: 'mc_vector_best',
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
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public ingestionDate: Date | undefined = undefined;

  //#region COMMON: updateDate
  @pycsw({
    profile: 'mc_vector_best',
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

  //#region COMMON: region
  @pycsw({
    profile: 'mc_vector_best',
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
  //#endregion

  //#region VECTOR_BEST SPECIFIC FIELDS
  //#region VECTOR_BEST: productVersion
  @pycsw({
    profile: 'mc_vector_best',
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
    isAutoGenerated: true,
  })
  //#endregion
  public productVersion: string | undefined = undefined;

  //#region VECTOR_BEST: productType
  @pycsw({
    profile: 'mc_vector_best',
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
  @tsTypes({
    mappingType: TsTypes.PRODUCTTYPE,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public productType: ProductType | undefined = ProductType.RASTER_VECTOR_BEST;

  //#region VECTOR_BEST: srsName
  @pycsw({
    profile: 'mc_vector_best',
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

  //#region VECTOR_BEST: scale
  @pycsw({
    profile: 'mc_vector_best',
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
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    infoMsgCode: [
      'info-field-tooltip.scale.tooltip',
      'info-general-tooltip.required',
      'info-field-tooltip.scale.min',
      'info-field-tooltip.scale.max',
    ],
    validation: [
      {
        errorMsgCode: 'validation-general.required',
        required: true,
      },
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
  })
  //#endregion
  public scale: string | undefined = undefined;

  //#region VECTOR_BEST: footprint
  @pycsw({
    profile: 'mc_vector_best',
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
  })
  //#endregion
  public footprint: GeoJSON | undefined = undefined;
  //#endregion

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<VectorBestMetadata>(new VectorBestMetadata(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping<VectorBestMetadata>(new VectorBestMetadata(), prop);
  }

  public static getFieldConfig(prop: string): IFieldConfigInfo | undefined {
    return getFieldConfig<VectorBestMetadata>(new VectorBestMetadata(), prop);
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new VectorBestMetadata();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<VectorBestMetadata>(layer, prop);
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
    const layer = new VectorBestMetadata();
    for (const prop in layer) {
      const catalogDbMap = getCatalogDBMapping<VectorBestMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<VectorBestMetadata>(layer, prop);
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
    const layer = new VectorBestMetadata();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<VectorBestMetadata>(layer, prop);
      if (fieldConfigMap) {
        ret.push({
          prop: prop,
          ...fieldConfigMap,
        });
      }
    }
    return ret;
  }

  public static getShpMappings(): IPropSHPMapping[] {
    return [];
  }
}
