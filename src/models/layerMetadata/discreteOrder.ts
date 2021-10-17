import { graphqlClass } from '../common/decorators/graphQL/classGraphql.decorator';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';

@graphqlClass()
export class DiscreteOrder {
  //#region FIELD: id
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  //#endregion
  public id?: string = undefined;

  //#region FIELD: zOrder
  @tsTypes({
    mappingType: TsTypes.NUMBER,
  })
  @graphql()
  //#endregion
  public zOrder?: number = undefined;
}
