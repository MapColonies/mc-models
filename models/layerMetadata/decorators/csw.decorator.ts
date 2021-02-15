import "reflect-metadata";

const pycswMappingMetadataKey = Symbol("pycswmapping");

export interface IPYCSWMapping {
  xmlElement: string;       // pycsw XML element
  queryableField: string;   // pycsw ProfileRepository Queryable field
  pycswField?: string;      // pycsw core field
}

export function pycsw(pycswmapping: IPYCSWMapping) {
  return Reflect.metadata(pycswMappingMetadataKey, pycswmapping);
}

export function getPyCSWMapping(target: any, propertyKey: string) {
  return Reflect.getMetadata(pycswMappingMetadataKey, target, propertyKey);
}