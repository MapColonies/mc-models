import { graphqlClass } from '../common/decorators/graphQL/classGraphql.decorator';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { FieldCategory, fieldConfig } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { fieldConfigClass } from '../common/decorators/fieldConfig/classFieldConfig.decorator';
import { TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';

@fieldConfigClass()
@graphqlClass()
export class FieldFeatureType {
  //#region FIELD: fieldName
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
  public fieldName?: string = undefined;

  //#region FIELD: aliasFieldName
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
  public aliasFieldName?: string = undefined;

  //#region FIELD: type
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
  public type?: string = undefined;
}

@fieldConfigClass()
@graphqlClass()
export class VectorFeatureTypeStructure {
  //#region FIELD: layerName
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
  public layerName?: string = undefined;

  //#region FIELD: aliasLayerName
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
  public aliasLayerName?: string = undefined;

  //#region FIELD: fields
  @tsTypes({
    mappingType: TsTypes.FIELDFEATURETYPES,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
  })
  //#endregion
  public fields?: FieldFeatureType[] = undefined;
}
