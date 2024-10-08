import { getTsTypesMapping } from '../../../layerMetadata/decorators/property/tsTypes.decorator';
import { IPropGraphQLMapping } from '../../interfaces/propGraphQLMapping.interface';
import { getGraphQLMapping } from './graphql.decorator';

type KeyValueDict = Record<string, unknown>;
const target: IGraphQLClassMapping[] = [];

export interface IGraphQLClass {
  alias?: string;
  fields?: string[];
}

export interface IGraphQLClassMapping {
  name: string;
  fields: IPropGraphQLMapping[];
}

export function graphqlClass(args?: IGraphQLClass): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <TFunction extends Function>(classCtr: TFunction): TFunction => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    const classInstance = new (classCtr as any)();
    const classData: IGraphQLClassMapping = {
      fields: getGraphQLMappings(classInstance, args?.fields),
      name: args?.alias ?? classCtr.name,
    };

    target.push(classData);
    return classCtr;
  };
}

export function getGraphQLClassMapping(): IGraphQLClassMapping[] {
  return target;
}

export function getGraphQLMappings(object: KeyValueDict, fields?: string[]): IPropGraphQLMapping[] {
  const ret: IPropGraphQLMapping[] = [];
  const props = fields ?? Object.keys(object);
  props.forEach((prop) => {
    const graphQLMap = getGraphQLMapping(object, prop);
    const tsTypesMap = getTsTypesMapping(object, prop);
    if (graphQLMap && tsTypesMap) {
      ret.push({
        prop: prop,
        ...graphQLMap,
        ...tsTypesMap,
      });
    }
  });
  return ret;
}
