import { graphqlClass } from '../common/decorators/graphQL/classGraphql.decorator';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { FieldCategory, fieldConfig } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { fieldConfigClass } from '../common/decorators/fieldConfig/classFieldConfig.decorator';
import { TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';

@fieldConfigClass()
@graphqlClass()
export class Link {
  //#region FIELD: name
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public name?: string = undefined;

  //#region FIELD: description
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public description?: string = undefined;

  //#region FIELD: protocol
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public protocol?: string = undefined;

  //#region FIELD: url
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public url?: string = undefined;
}
