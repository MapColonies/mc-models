import { GeoJSON } from 'geojson';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { graphql } from '../common/decorators/property/graphql.decorator';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { getShpMapping, IShpMapping, ShapeFileType, shpMapping } from './decorators/property/shp.decorator';
import { getCatalogDBMapping, ICatalogDBMapping, catalogDB } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, ITsTypesMapping, tsTypes, TsTypes } from './decorators/property/tsTypes.decorator';

export interface ILayerMetadata {
  source?: string;
  sourceName?: string;
  updateDate?: Date;
  resolution?: number;
  ep90?: number;
  sensorType?: SensorType;
  rms?: number;
  scale?: string;
  dsc?: string;
  geometry?: GeoJSON;
  id?: string;
  version?: string;
}
export interface IPropSHPMapping extends IShpMapping, ITsTypesMapping {
  prop: string;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export enum SensorType {
  VIS = 'VIS',
  RGB = 'RGB',
  // eslint-disable-next-line
  Pan_Sharpen = 'Pan_Sharpen',
  OTHER = 'OTHER',
}

export class LayerMetadata implements ILayerMetadata {
  /**
   * Layer's unique identifier
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:source',
    queryableField: 'mc:source',
    pycswField: 'pycsw:Source',
  })
  @catalogDB({
    column: {
      name: 'source',
      type: 'text',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Source',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public source?: string = undefined;

  /**
   * Layer's source name
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:sourceName',
    queryableField: 'mc:sourceName',
    pycswField: 'pycsw:SourceName',
  })
  @catalogDB({
    column: {
      name: 'sourceName',
      type: 'text',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SourceName',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public sourceName?: string = undefined;

  /**
   * Layer creation time
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:updateDate',
    queryableField: 'mc:updateDate',
    pycswField: 'pycsw:UpdateDate',
  })
  @catalogDB({
    column: {
      name: 'updateDate',
      type: 'timestamp without time zone',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.UpdateDate',
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  public updateDate?: Date = undefined;

  /**
   * Layer resolution
   */
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
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Resolution',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  public resolution?: number = undefined;

  /**
   * accuracy
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:ep90',
    queryableField: 'mc:ep90',
    pycswField: 'pycsw:Ep90',
  })
  @catalogDB({
    column: {
      name: 'ep90',
      type: 'real', // check if 'decimal' type is needed
      nullable: true,
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Ep90',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  public ep90?: number = undefined;

  /**
   * Layer sensor type
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:sensorType',
    queryableField: 'mc:sensorType',
    pycswField: 'pycsw:sensorType',
  })
  @catalogDB({
    column: {
      name: 'sensorType',
      type: 'text',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SensorType',
  })
  @tsTypes({
    mappingType: TsTypes.SENSORTYPE,
  })
  @graphql({
    nullable: true,
  })
  public sensorType?: SensorType = undefined;

  /**
   * RMS
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:rms',
    queryableField: 'mc:rms',
    pycswField: 'pycsw:Rms',
  })
  @catalogDB({
    column: {
      name: 'rms',
      type: 'real', // check if 'decimal' type is needed
      nullable: true,
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Rms',
  })
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql({
    nullable: true,
  })
  public rms?: number = undefined;

  /**
   * Scale of layer
   */
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
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Scale',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public scale?: string = undefined;

  /**
   * Layer description
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:dsc',
    queryableField: 'mc:dsc',
    pycswField: 'pycsw:Abstract',
  })
  @catalogDB({
    column: {
      name: 'description',
      type: 'text',
      nullable: true,
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Dsc',
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public dsc?: string = undefined;

  /**
   * General geometry
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:geometry',
    queryableField: 'mc:geometry',
    pycswField: 'pycsw:Geometry',
  })
  @catalogDB({
    column: {
      name: 'geojson',
      type: 'text',
      nullable: true,
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].geometry',
  })
  @tsTypes({
    mappingType: TsTypes.OBJECT,
  })
  @graphql({
    nullable: true,
  })
  public geometry?: GeoJSON = undefined;

  /**
   * layer id
   */
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
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public id?: string = undefined;

  /**
   * layer version
   */
  @pycsw({
    profile: 'mc_raster',
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

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping<LayerMetadata>(new LayerMetadata(), prop);
  }

  public static getShpMapping(prop: string): IShpMapping | undefined {
    return getShpMapping<LayerMetadata>(new LayerMetadata(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping<LayerMetadata>(new LayerMetadata(), prop);
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

  public static getShpMappings(): IPropSHPMapping[] {
    const ret = [];
    const layer = new LayerMetadata();
    for (const prop in layer) {
      const shpMap = getShpMapping<LayerMetadata>(layer, prop);
      const tsTypesMap = getTsTypesMapping<LayerMetadata>(layer, prop);
      if (shpMap && tsTypesMap) {
        ret.push({
          prop: prop,
          ...shpMap,
          ...tsTypesMap,
        });
      }
    }
    return ret;
  }
}
