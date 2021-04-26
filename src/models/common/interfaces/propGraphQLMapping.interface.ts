import { IGraphQLMapping } from '../decorators/property/graphql.decorator';
import { ITsTypesMapping } from '../../layerMetadata/decorators/property/tsTypes.decorator';

export interface IPropGraphQLMapping extends IGraphQLMapping, ITsTypesMapping {
  prop: string;
}
