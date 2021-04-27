import { graphqlClass } from '../common/decorators/property/classGraphql.decorator';
import { graphql } from '../common/decorators/property/graphql.decorator';
import { TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';

@graphqlClass()
export class Link {
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public name?: string = undefined;

  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  public description?: string = undefined;

  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  public protocol?: string = undefined;

  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  public url?: string = undefined;
}
