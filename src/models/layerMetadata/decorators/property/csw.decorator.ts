import 'reflect-metadata';

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

export function getPyCSWMapping<T>(target: T, propertyKey: string): IPYCSWMapping | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(pycswMappingMetadataKey, target, propertyKey) as IPYCSWMapping;
}
