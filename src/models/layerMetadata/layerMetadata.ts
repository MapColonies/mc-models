import { GeoJSON } from 'geojson';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/csw.decorator';
import { getShpMapping, IShpMapping, ShapeFileType, shpMapping } from './decorators/shp.decorator';
import { getCatalogDBMapping, ICatalogDBMapping, catalogDB } from './decorators/catalogDB.decorator';

export interface ILayerMetadata {
  source?: string;
  sourceName?: string;
  updateDate?: Date;
  resolution?: number;
  ep90?: number;
  sensorType?: string;
  rms?: number;
  scale?: string;
  dsc?: string;
  geometry?: GeoJSON;
  id?: string;
  version?: string;
}
export interface IPropSHPMapping extends IShpMapping {
  prop: string;
}

export interface IPropPYCSWMapping extends IPYCSWMapping {
  prop: string;
}

export interface IPropCatalogDBMapping extends ICatalogDBMapping {
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
    table: 'records',
    column: {
      name: 'source',
      type: 'text',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Source',
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
    table: 'records',
    column: {
      name: 'sourceName',
      type: 'text',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SourceName',
  })
  public sourceName?: string = undefined;;

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
    table: 'records',
    column: {
      name: 'updateDate',
      type: 'timestamp without time zone',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.UpdateDate',
  })
  public updateDate?: Date = undefined;;

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
    table: 'records',
    column: {
      name: 'resolution',
      type: 'real', // check if 'decimal' type is needed
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Resolution',
  })
  public resolution?: number = undefined;;

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
    table: 'records',
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
  public ep90?: number = undefined;;

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
    table: 'records',
    column: {
      name: 'sensorType',
      type: 'text',
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SensorType',
  })
  public sensorType?: SensorType = undefined;;

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
    table: 'records',
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
  public rms?: number = undefined;;

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
    table: 'records',
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
  public scale?: string = undefined;;

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
    table: 'records',
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
  public dsc?: string = undefined;;

  /**
   * General geometry
   */
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:geometry',
    queryableField: 'mc:boundingBox',
    pycswField: 'pycsw:BoundingBox',
  })
  @catalogDB({
    table: 'records',
    column: {
      name: 'wkt_geometry',
      type: 'text',
      nullable: true,
    },
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].geometry',
  })
  public geometry?: GeoJSON = undefined;;

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
    table: 'records',
    column: {
      name: 'identifier',
      type: 'text',
      nullable: true,
    },
  })
  public id?: string = undefined;;

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
    table: 'records',
    column: {
      name: 'version',
      type: 'text',
      nullable: true,
    },
  })
  public version?: string = undefined;;

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping(new LayerMetadata(), prop);
  }

  public static getShpMapping(prop: string): IShpMapping | undefined {
    return getShpMapping(new LayerMetadata(), prop);
  }

  public static getCatalogDBMapping(prop: string): ICatalogDBMapping | undefined {
    return getCatalogDBMapping(new LayerMetadata(), prop);
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new LayerMetadata();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping(layer, prop);
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
      const catalogDbMap = getCatalogDBMapping(layer, prop);
      if (catalogDbMap) {
        ret.push({
          prop: prop,
          ...catalogDbMap,
        });
      }
    }
    return ret;
  }

  public static getShpMappings(): IPropSHPMapping[] {
    const ret = [];
    const layer = new LayerMetadata();  
    for (const prop in layer) {
      const shpMap = getShpMapping(layer, prop);
      if (shpMap) {
        ret.push({
          prop: prop,
          ...shpMap,
        });
      }
    }
    return ret;
  }
}
