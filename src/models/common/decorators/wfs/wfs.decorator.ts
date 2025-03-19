import 'reflect-metadata';

const wfsMetadataKey = Symbol('wfsmapping');

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum JAVA_BINDINGS {
  UUID = 'java.util.UUID',
  STRING = 'java.lang.String',
  TIMESTAMP = 'java.sql.Timestamp',
  FLOAT = 'java.lang.Float',
  BIGDECIMAL = 'java.math.BigDecimal',
  POLYGON = 'org.locationtech.jts.geom.Polygon',
}

export interface IWFSMapping {
  geoserver?: {
    binding: JAVA_BINDINGS; // java type 'java.util.UUID'
    name?: string; // property name that will be exposed by WFS service
    minOccurs?: number;
    maxOccurs?: number;
  };
  capabilitiesMapping?: {
    xmlElement: string;
  };
}

export interface IPropWFSMapping extends IWFSMapping {
  prop: string; // prop name for convinience
}

export interface IWFSGeoServerMapping extends IWFSMapping, IPropWFSMapping {
  source: string; // DB column name. IMPORTANT: Will be derived from catalogDB decorator metadata
  nillable: boolean; // is nullable by DB definitions
}

export function wfs(wfsmapping?: IWFSMapping): PropertyDecorator {
  return Reflect.metadata(wfsMetadataKey, wfsmapping);
}

export function getWFSMapping<T>(target: T, propertyKey: string): IWFSMapping | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(wfsMetadataKey, target, propertyKey) as IWFSMapping;
}
