import 'reflect-metadata';

const shpMappingMetadataKey = Symbol('shpmapping');

export interface IShpMapping {
  shpFile: ShapeFileType;
  valuePath: string;
}

export enum ShapeFileType {
  FILES = 'Files',
  PRODUCT = 'Product',
  SHAPE_METADATA = 'ShapeMetadata',
}

export function shpMapping(shpmapping: IShpMapping): PropertyDecorator {
  return Reflect.metadata(shpMappingMetadataKey, shpmapping);
}

export function getShpMapping<T>(target: T, propertyKey: string): IShpMapping | undefined {
  return Reflect.getMetadata(shpMappingMetadataKey, target, propertyKey) as IShpMapping;
}
