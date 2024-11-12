import 'reflect-metadata';
import { ICatalogDBEntityMapping } from './catalogDBEntity.decorator';

const catalogDbEntityMetadataKey = Symbol('dbentitymapping');

// eslint-disable-next-line @typescript-eslint/naming-convention
export function DBEntity(catalogdbentitymapping: ICatalogDBEntityMapping): ClassDecorator {
  return Reflect.metadata(catalogDbEntityMetadataKey, catalogdbentitymapping);
}

export function getDBEntityMapping<T>(target: T): ICatalogDBEntityMapping {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(catalogDbEntityMetadataKey, target) as ICatalogDBEntityMapping;
}
