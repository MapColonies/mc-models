import 'reflect-metadata';

const inputDataMappingMetadataKey = Symbol('inputDataMapping');

export interface IDataMapping {
  dataFile: DataFileType;
  valuePath: string;
  isCustomLogic?: boolean;
}

export enum DataFileType {
  FILES = 'Files',
  PRODUCT = 'Product',
  SHAPE_METADATA = 'ShapeMetadata',
  TFW = 'TFW',
}

export function inputDataMapping(dataMapping: IDataMapping): PropertyDecorator {
  return Reflect.metadata(inputDataMappingMetadataKey, dataMapping);
}

export function getInputDataMapping<T>(target: T, propertyKey: string): IDataMapping | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(inputDataMappingMetadataKey, target, propertyKey) as IDataMapping;
}
