import { GeoJSON } from "geojson";
import { getPyCSWMapping, IPYCSWMapping, pycsw } from "./decorators/csw.decorator";
import { getShpMapping, ISHPMapping, ShapeFileType, shpMapping } from "./decorators/shp.decorator";

export interface IPropSHPMapping extends ISHPMapping{
  prop: string
}

export interface IPropPYCSWMapping extends IPYCSWMapping{
  prop: string
}

export enum SensorType {
  VIS = 'VIS',
  RGB = 'RGB',
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
    valuePath: 'features[0].properties.Source'
  })
  source?: string = undefined;

  /**
   * layer version
   */
  version?: string = undefined;

  /**
   * Layer's source name
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SourceName'
  })
  sourceName?: string = undefined;

  /**
   * Layer creation time
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.UpdateDate'
  })
  updateDate?: Date = undefined;

  /**
   * Layer resolution
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Resolution'
  })
  resolution?: number = undefined;

  /**
   * accuracy
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Ep90'
  })
  ep90?: number = undefined;

  /**
   * Layer sensor type
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.SensorType'
  })
  sensorType?: SensorType = undefined;

   /**
   * RMS
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Rms'
  })
  rms?: number = undefined;

  /**
   * Scale of layer
   */
  @shpMapping({
    shpFile: ShapeFileType.SHAPE_METADATA,
    valuePath: 'features[0].properties.Scale'
  })
  scale?: string = undefined;

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
    valuePath: 'features[0].properties.Dsc'
  })
  dsc?: string = undefined;

  /**
   * List of URIs for the layer files
   */
  fileUris?: string[] = undefined;

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
    valuePath: 'features[0].geometry'
  })
  geometry?: GeoJSON = undefined;

  static getPyCSWMapping(prop: string): IPYCSWMapping {
    return getPyCSWMapping(new LayerMetadata(), prop);
  }

  static getShpMapping(prop: string): ISHPMapping {
    return getShpMapping(new LayerMetadata(), prop);
  }

  static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new LayerMetadata();
    for(const prop in layer){
      if (layer.hasOwnProperty(prop)) {
        const pycswMap = getPyCSWMapping(layer, prop);
        if(pycswMap){
          ret.push({
            prop: prop,
            ...pycswMap
          });
        }
      }
    }
    console.log(ret);
    return ret;
  }

  static getShpMappings(): IPropSHPMapping[] {
    const ret = [];
    const layer = new LayerMetadata();
    for(const prop in layer){
      if (layer.hasOwnProperty(prop)) {
        const shpMap = getShpMapping(layer, prop);
        if(shpMap){
          ret.push({
            prop: prop,
            ...shpMap
          });
        }
      }
    }
    console.log(ret);
    return ret;
  }

}
