import { TsTypes, tsTypes } from '../../layerMetadata/decorators/property/tsTypes.decorator';
import { graphqlClass } from '../decorators/property/classGraphql.decorator';
import { graphql } from '../decorators/property/graphql.decorator';

@graphqlClass()
export class Link {
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  name?: string = undefined;

  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  description?: string = undefined;

  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  protocol?: string = undefined;

  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  url?: string = undefined;
}
