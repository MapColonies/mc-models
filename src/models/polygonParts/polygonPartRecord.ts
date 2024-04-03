import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { IOrmCatalog } from '../common/interfaces/ormCatalog.interface';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { graphqlClass } from '../common/decorators/graphQL/classGraphql.decorator';
import { FieldCategory, fieldConfig, getFieldConfig, IPropFieldConfigInfo } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { getFieldConfigClassInfo } from '../common/decorators/fieldConfig/classFieldConfig.decorator';
import { catalogDB, getCatalogDBMapping } from '../layerMetadata/decorators/property/catalogDB.decorator';
import { getTsTypesMapping, TsTypes, tsTypes } from '../layerMetadata/decorators/property/tsTypes.decorator';
import { getCatalogDBEntityMapping, catalogDBEntity, ICatalogDBEntityMapping } from '../layerMetadata/decorators/class/catalogDBEntity.decorator';
import { PolygonPart } from './polygonPart';

@catalogDBEntity({
  table: 'records',
  className: 'RecordEntity',
})
@graphqlClass({ alias: 'PolygonPartRecord' })
export class PolygonPartRecord extends PolygonPart implements IOrmCatalog {
  //#region RECORD: internalId_partId
  @catalogDB({
    column: {
      name: 'internalId_partId',
      type: 'number',
      nullable: false,
      primary: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public internalId_partId: number | undefined;

  //#region RECORD: partId
  @catalogDB({
    column: {
      name: 'partId',
      type: 'number',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public partId: number | undefined;

  //#region RECORD: recordId
  @catalogDB({
    column: {
      name: 'recordId',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public recordId: string | undefined = 'UNKNOWN';

  //#region RECORD: version
  @catalogDB({
    column: {
      name: 'version',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.MAIN,
    infoMsgCode: ['info-field-tooltip.productVersion.pattern'],
    validation: [
      {
        errorMsgCode: 'validation-field.productVersion.pattern',
        valueType: 'value',
        pattern: '^[1-9]\\d{0,2}(\\.(0|[1-9]\\d?))?$',
      },
    ],
  })
  //#endregion
  public version: string | undefined = undefined;

  //#region RECORD: ingestionDateUTC
  @catalogDB({
    column: {
      name: 'ingestionDateUTC',
      type: 'timestamp with time zone',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql()
  @fieldConfig({
    category: FieldCategory.MAIN,
    isAutoGenerated: true,
  })
  //#endregion
  public ingestionDateUTC: Date | undefined = undefined;

  public constructor() {
    super();
  }

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const layer = new PolygonPartRecord();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<PolygonPartRecord>(layer, prop);
      if (fieldConfigMap) {
        const fieldConfig = { prop: prop, ...fieldConfigMap };
        if (fieldConfigMap.complexType) {
          fieldConfig.subFields = getFieldConfigClassInfo(fieldConfigMap.complexType.value);
        }
        ret.push(fieldConfig);
      }
    }
    return ret as IPropFieldConfigInfo[];
  }

  public getORMCatalogMappings(): IPropCatalogDBMapping[] {
    const ret = [];

    for (const prop in this) {
      const catalogDbMap = getCatalogDBMapping(this, prop);
      const tsTypesMap = getTsTypesMapping(this, prop);
      if (catalogDbMap && tsTypesMap) {
        ret.push({
          prop: prop,
          ...catalogDbMap,
          ...tsTypesMap,
        });
      }
    }
    return ret;
  }

  public getORMCatalogEntityMappings(): ICatalogDBEntityMapping {
    return getCatalogDBEntityMapping(PolygonPartRecord);
  }
}
