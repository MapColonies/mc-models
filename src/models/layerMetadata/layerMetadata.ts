import { GeoJSON } from 'geojson';
import { getPyCSWMapping, IPYCSWMapping, pycsw } from './decorators/csw.decorator';
import { getShpMapping, IShpMapping, ShapeFileType, shpMapping } from './decorators/shp.decorator';

export interface IPropSHPMapping extends IShpMapping {
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

export class LayerMetadata {
  /**
   * Layer's unique identifier
   */
  @pycsw({
    xmlElement: 'mc:source',
    queryableField: 'mcgc:source',
    pycswField: 'pycsw:Source',
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Source',
  })
  public source?: string = undefined;

  /**
   * Layer's source name
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SourceName',
  })
  public sourceName?: string = undefined;

  /**
   * Layer creation time
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.UpdateDate',
  })
  public updateDate?: Date = undefined;

  /**
   * Layer resolution
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Resolution',
  })
  public resolution?: number = undefined;

  /**
   * accuracy
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Ep90',
  })
  public ep90?: number = undefined;

  /**
   * Layer sensor type
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SensorType',
  })
  public sensorType?: SensorType = undefined;

  /**
   * RMS
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Rms',
  })
  public rms?: number = undefined;

  /**
   * Scale of layer
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Scale',
  })
  public scale?: string = undefined;

  /**
   * Layer description
   */
  @pycsw({
    xmlElement: 'mc:description',
    queryableField: 'mcgc:description',
    pycswField: 'pycsw:Abstract',
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Dsc',
  })
  public dsc?: string = undefined;

  /**
   * General geometry
   */
  @pycsw({
    xmlElement: 'ows:BoundingBox',
    queryableField: 'mcgc:boundingBox',
    pycswField: 'pycsw:BoundingBox',
  })
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].geometry',
  })
  public geometry?: GeoJSON = undefined;

  /**
   * layer id
   */
  public id?: string = undefined;

  /**
   * layer version
   */
  public version?: string = undefined;

  public static getPyCSWMapping(prop: string): IPYCSWMapping | undefined {
    return getPyCSWMapping(new LayerMetadata(), prop);
  }

  public static getShpMapping(prop: string): IShpMapping | undefined {
    return getShpMapping(new LayerMetadata(), prop);
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
