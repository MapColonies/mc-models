import 'reflect-metadata';

const graphQLMetadataKey = Symbol('graphqlmapping');

export interface IGraphQLMapping {
  nullable?: boolean;
}

export function graphql(graphqlmapping?: IGraphQLMapping): PropertyDecorator {
  const defaultMapping: IGraphQLMapping = { nullable: false };
  return Reflect.metadata(graphQLMetadataKey, graphqlmapping ?? defaultMapping);
}

export function getGraphQLMapping<T>(target: T, propertyKey: string): IGraphQLMapping | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Reflect.getMetadata(graphQLMetadataKey, target, propertyKey) as IGraphQLMapping;
}
