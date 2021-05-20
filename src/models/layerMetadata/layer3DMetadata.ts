import { GeoJSON } from 'geojson';
import { graphql } from '../common/decorators/property/graphql.decorator';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';
import { SensorType } from './enums';
import { catalogDB } from './decorators/property/catalogDB.decorator';

export interface ILayer3DMetadata {
  id: string;
  // project_name?: string;
  // title?: string;
  version?: string; // TODO: Might be refactored as COMMON
  centroid?: string;
  // footprint?: string;
  geometry?: GeoJSON; // TODO: Might be refactored as COMMON
  // classification?: string;
  imagingBeginDate?: Date;
  imagingEndDate?: Date;
  sensorType?: SensorType; // TODO: Might be refactored as COMMON
  region?: string; // TODO: Might be refactored as COMMON
  nominalResolution?: string;
  accuracyLE90?: string;
  horizontalAccuracyCE90?: string;
  relativeAccuracyLE90?: string;
  // creation_date?: Date;
  // producer_name?: string;
  // srs?: string;
  validationDate?: Date;
  estimatedPrecision?: string;
  measuredPrecision?: string;
  // description?: string;
  // links:;
  // type:;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export class Layer3DMetadata implements ILayer3DMetadata {
  /**
   * layer id
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:id',
    queryableField: 'mc:id',
    pycswField: 'pycsw:Identifier',
  })
  @catalogDB({
    column: {
      name: 'identifier',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  public id = 'UNKNOWN';

  /**
   * layer version
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:version',
    queryableField: 'mc:vserion',
    pycswField: 'pycsw:version',
  })
  @catalogDB({
    column: {
      name: 'version',
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
  public version?: string = undefined;

  /**
   * layer centroid
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:centroid',
    queryableField: 'mc:centroid',
    pycswField: 'pycsw:centroid',
  })
  @catalogDB({
    column: {
      name: 'centroid',
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
  public centroid?: string = undefined;

  /**
   * General geometry
   */
  @pycsw({
    profile: 'mc_3d',
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
  public geometry?: GeoJSON = undefined;

  /**
   * Layer imaging time begin
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:imagingTime_begin',
    queryableField: 'mc:imagingTime_begin',
    pycswField: 'pycsw:TempExtent_begin',
  })
  @catalogDB({
    column: {
      name: 'time_begin',
      type: 'timestamp without time zone',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  public imagingBeginDate?: Date = undefined;

  /**
   * Layer imaging time end
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:imagingTime_end',
    queryableField: 'mc:imagingTime_end',
    pycswField: 'pycsw:TempExtent_end',
  })
  @catalogDB({
    column: {
      name: 'time_end',
      type: 'timestamp without time zone',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  public imagingEndDate?: Date = undefined;

  /**
   * Layer sensor type
   */
  @pycsw({
    profile: 'mc_rd',
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
  public sensorType?: SensorType = undefined;

  /**
   * layer region
   */
  @pycsw({
    profile: 'mc_3d',
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
  public region?: string = undefined;

  /**
   * layer nominal Resolution
   */
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
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public nominalResolution?: string = undefined;

  /**
   * layer accuracy_LE_90
   */
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
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public accuracyLE90?: string = undefined;

  /**
   * layer horizontal_accuracy_CE_90
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:horizontalAccuracyCE90',
    queryableField: 'mc:horizontalAccuracyCE90',
    pycswField: 'pycsw:horizontalAccuracyCE90',
  })
  @catalogDB({
    column: {
      name: 'horizontal_accuracy_ce_90',
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
  public horizontalAccuracyCE90?: string = undefined;

  /**
   * layer accuracy_LE_90
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:relativeAccuracyLE90',
    queryableField: 'mc:relativeAccuracyLE90',
    pycswField: 'pycsw:relativeAccuracyLE90',
  })
  @catalogDB({
    column: {
      name: 'relative_accuracy_le_90',
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
  public relativeAccuracyLE90?: string = undefined;

  /**
   * Layer validation date
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:validationDate',
    queryableField: 'mc:validationDate',
    pycswField: 'pycsw:validationDate',
  })
  @catalogDB({
    column: {
      name: 'validation_date',
      type: 'timestamp without time zone',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  public validationDate?: Date = undefined;

  /**
   * layer estimated_precision
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:estimatedPrecision',
    queryableField: 'mc:estimatedPrecision',
    pycswField: 'pycsw:estimatedPrecision',
  })
  @catalogDB({
    column: {
      name: 'estimated_precision',
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
  public estimatedPrecision?: string = undefined;

  /**
   * layer measured_precision
   */
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:measuredPrecision',
    queryableField: 'mc:measuredPrecision',
    pycswField: 'pycsw:measuredPrecision',
  })
  @catalogDB({
    column: {
      name: 'measured_precision',
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
  public measuredPrecision?: string = undefined;

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
