import 'reflect-metadata';

const catalogDbEntityMetadataKey = Symbol('catalogdbentitymapping');

export interface ICatalogDBEntityMapping {
  table: string; // database table name
  className: string;
}

export function catalogDBEntity(catalogdbentitymapping: ICatalogDBEntityMapping): ClassDecorator {
  return Reflect.metadata(catalogDbEntityMetadataKey, catalogdbentitymapping);
}

export function getCatalogDBEntityMapping<T>(target: T): ICatalogDBEntityMapping {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(catalogDbEntityMetadataKey, target) as ICatalogDBEntityMapping;
}
