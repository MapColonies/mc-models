import 'reflect-metadata';
import { LayerMetadata } from '../index';

const pycswMappingMetadataKey = Symbol('pycswmapping');

export interface IPYCSWMapping {
  profile: string; // pycsw profile name
  xmlElement: string; // pycsw XML element
  queryableField: string; // pycsw ProfileRepository Queryable field
  pycswField?: string; // pycsw core field
}

export function pycsw(pycswmapping: IPYCSWMapping): PropertyDecorator {
  return Reflect.metadata(pycswMappingMetadataKey, pycswmapping);
}

export function getPyCSWMapping(target: LayerMetadata, propertyKey: string): IPYCSWMapping | undefined {
  return Reflect.getMetadata(pycswMappingMetadataKey, target, propertyKey) as IPYCSWMapping;
}
