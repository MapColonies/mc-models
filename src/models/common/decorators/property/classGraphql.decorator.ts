import 'reflect-metadata';
import { getTsTypesMapping } from '../../../layerMetadata/decorators/property/tsTypes.decorator';
import { IPropGraphQLMapping } from '../../interfaces/propGraphQLMapping.interface';
import { getGraphQLMapping } from './graphql.decorator';

const graphQLMetadataKey = Symbol('graphqlclassmapping');
type KeyValueDict = Record<string, unknown>;
const target = {};

export interface IGraphQLClass {
  alias?: string;
}

export interface IGraphQLClassMapping {
  name: string;
  fields: IPropGraphQLMapping[];
}

export function graphqlClass(args?: IGraphQLClass): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <TFunction extends Function>(classCtr: TFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const classInstance = new (classCtr as any)();
    const classData: IGraphQLClassMapping = {
      fields: getGraphQLMappings(classInstance),
      name: args?.alias ?? classCtr.name,
    };

    const classDataList = getGraphQLClassMapping() ?? [];
    classDataList.push(classData);
    Reflect.defineMetadata(graphQLMetadataKey, classDataList, target);
    return classCtr;
  };
}

export function getGraphQLClassMapping(): IGraphQLClassMapping[] | undefined {
  return Reflect.getMetadata(graphQLMetadataKey, target) as IGraphQLClassMapping[];
}

export function getGraphQLMappings(object: KeyValueDict): IPropGraphQLMapping[] {
  const ret = [];
  for (const prop in object) {
    const graphQLMap = getGraphQLMapping(object, prop);
    const tsTypesMap = getTsTypesMapping(object, prop);
    if (graphQLMap && tsTypesMap) {
      ret.push({
        prop: prop,
        ...graphQLMap,
        ...tsTypesMap,
      });
    }
  }
  return ret;
}
