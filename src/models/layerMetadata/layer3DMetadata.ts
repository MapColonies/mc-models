import { GeoJSON } from 'geojson';
import { graphql } from '../common/decorators/property/graphql.decorator';
import { RecordType } from '../pycsw/coreEnums';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';
import { SensorType } from './enums';
import { catalogDB } from './decorators/property/catalogDB.decorator';
import { IMetadataCommonModel } from './interfaces/metadataCommonModel';

export interface ILayer3DMetadata {
  projectName: string | undefined;
  nominalResolution: number | undefined;
  accuracyLE90: number | undefined;
  accuracySE90: number | undefined;
  visualAccuracy: number | undefined;
  heightRange: number | undefined;
  srsOrigin: string | undefined;
  flightAlt: number | undefined;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class Layer3DMetadata implements ILayer3DMetadata, IMetadataCommonModel {
  //#region COMMON FIELDS
  //#region COMMON: type
  @pycsw({
    profile: 'mc_3d',
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

  //#region COMMON: classification
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public classification: string | undefined = undefined;

  //#region COMMON: productId
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public productId: string | undefined = 'UNKNOWN';

  //#region COMMON: productName
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public productName: string | undefined = undefined;

  //#region COMMON: productVersion
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public productVersion: string | undefined = undefined;

  //#region COMMON: productType
  @pycsw({
    profile: 'mc_3d',
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
    mappingType: TsTypes.STRING,
  })
  @graphql()
  //#endregion
  public productType: string | undefined = undefined;

  //#region COMMON: description
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public description: string | undefined = undefined;

  //#region COMMON: srsId
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public srsId: string | undefined = undefined;

  //#region COMMON: srsName
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public srsName: string | undefined = undefined;

  //#region COMMON: producerName
  @pycsw({
    profile: 'mc_3d',
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
    profile: 'mc_3d',
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
  //#endregion
  public creationDate: Date | undefined = undefined;

  //#region COMMON: ingestionDate
  @pycsw({
    profile: 'mc_3d',
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
    profile: 'mc_3d',
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
  //#endregion
  public updateDate: Date | undefined = undefined;

  //#region COMMON: sourceDateStart
  @pycsw({
    profile: 'mc_3d',
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
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public sourceDateStart: Date | undefined = undefined;

  //#region COMMON: sourceDateEnd
  @pycsw({
    profile: 'mc_3d',
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
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public sourceDateEnd: Date | undefined = undefined;

  //#region COMMON: resolution
  @pycsw({
    profile: 'mc_3d',
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
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public resolution: number | undefined = undefined;

  //#region COMMON: accuracyCE90
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public accuracyCE90: number | undefined = undefined;

  //#region COMMON: sensorType    //sensors
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:sensorType',
    queryableField: 'mc:sensorType',
    pycswField: 'pycsw:sensorType',
  })
  @catalogDB({
    column: {
      name: 'sensor_type',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.SENSORTYPE,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public sensorType: SensorType | undefined = undefined;

  //#region COMMON: region
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public region: string | undefined = undefined;
  //#endregion

  //#region 3D SPECIFIC FIELDS
  //#region 3D: projectName
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:projectName',
    queryableField: 'mc:projectName',
    pycswField: 'pycsw:projectName',
  })
  @catalogDB({
    column: {
      name: 'project_name',
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
  public projectName: string | undefined = undefined;

  //#region 3D: footprint
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public footprint: GeoJSON | undefined = undefined;

  //#region 3D: nominalResolution
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public nominalResolution: number | undefined = undefined;

  //#region 3D: accuracyLE90
  @pycsw({
    profile: 'mc_3d',
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
  //#endregion
  public accuracyLE90: number | undefined = undefined;

  //#region 3D: accuracySE90
  @pycsw({
    profile: 'mc_3d',
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
    profile: 'mc_3d',
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

  //#region 3D: heightRange
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:heightRange',
    queryableField: 'mc:heightRange',
    pycswField: 'pycsw:heightRange',
  })
  @catalogDB({
    column: {
      name: 'height_range',
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
  public heightRange: number | undefined = undefined;

  //#region COMMON: srsOrigin
  @pycsw({
    profile: 'mc_3d',
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

  //#region 3D: flightAlt
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:flightAlt',
    queryableField: 'mc:flightAlt',
    pycswField: 'pycsw:flightAlt',
  })
  @catalogDB({
    column: {
      name: 'flight_alt',
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
  public flightAlt: number | undefined = undefined;
  //#endregion

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<Layer3DMetadata>(new Layer3DMetadata(), prop);
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
}
