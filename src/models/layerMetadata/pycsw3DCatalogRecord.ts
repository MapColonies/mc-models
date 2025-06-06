import { IPycswCoreModel } from '../pycsw/interfaces/pycswCoreModel';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { IOrmCatalog } from '../common/interfaces/ormCatalog.interface';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { graphqlClass } from '../common/decorators/graphQL/classGraphql.decorator';
import { getFieldConfigClassInfo } from '../common/decorators/fieldConfig/classFieldConfig.decorator';
import { FieldCategory, fieldConfig, getFieldConfig, IPropFieldConfigInfo } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { catalogDB, getCatalogDBMapping, ORMColumnType } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';
import { getCatalogDBEntityMapping, catalogDBEntity, ICatalogDBEntityMapping } from './decorators/class/catalogDBEntity.decorator';
import { getPyCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { Layer3DMetadata, IPropPYCSWMapping } from './layer3DMetadata';
import { Link } from './link';
import { IPropSHPMapping } from './decorators/property/shp.decorator';

@catalogDBEntity({
  table: 'records',
  className: 'Metadata',
})
@graphqlClass({ alias: 'Layer3DRecord' })
export class Pycsw3DCatalogRecord extends Layer3DMetadata implements IPycswCoreModel, IOrmCatalog {
  //#region CORE: id
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:id',
    queryableField: 'mc:id',
    pycswField: 'pycsw:Identifier',
  })
  @catalogDB({
    column: {
      name: 'identifier',
      type: 'text',
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
  public id: string | undefined = 'UNKNOWN';

  //#region CORE: typename
  @catalogDB({
    column: {
      name: 'typename',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public typeName: string | undefined = 'mc_MC3DRecord';

  //#region CORE: schema
  @catalogDB({
    column: {
      name: 'schema',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public schema: string | undefined = 'mc_3d';

  //#region CORE: mdsource
  @catalogDB({
    column: {
      name: 'mdsource',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public mdSource: string | undefined = '';

  //#region CORE: xml
  @catalogDB({
    column: {
      name: 'xml',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public xml: string | undefined = '';

  //#region CORE: anyText
  @catalogDB({
    column: {
      name: 'anytext',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public anyText: string | undefined = '';

  //#region CORE: insertDate
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:insertDate',
    queryableField: 'mc:insertDate',
    pycswField: 'pycsw:InsertDate',
  })
  @catalogDB({
    column: {
      name: 'insert_date',
      type: 'timestamp without time zone',
      nullable: true,
      columnType: ORMColumnType.CREATE_DATE_COLUMN,
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isAutoGenerated: true,
  })
  //#endregion
  public insertDate: Date | undefined = undefined;

  //#region CORE: wktGeometry
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:boundingBox',
    queryableField: 'mc:boundingBox',
    pycswField: 'pycsw:boundingBox',
  })
  @catalogDB({
    column: {
      name: 'wkt_geometry',
      type: 'text',
      nullable: false,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @fieldConfig({
    category: FieldCategory.GEO_INFO,
    isAutoGenerated: true,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public wktGeometry: string | undefined = undefined;

  //#region CORE: wkbGeometry (DD trigger populated)
  @catalogDB({
    column: {
      name: 'wkb_geometry',
      type: 'geometry',
      spatialFeatureType: 'Geometry',
      srid: 4326,
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public wkbGeometry: string | undefined = undefined;

  //#region CORE: keywords
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:keywords',
    queryableField: 'mc:keywords',
    pycswField: 'pycsw:keywords',
  })
  @catalogDB({
    column: {
      name: 'keywords',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
  })
  //#endregion
  public keywords: string | undefined = '';

  //#region CORE: anyTextTsvector
  @catalogDB({
    column: {
      name: 'anytext_tsvector',
      type: 'tsvector',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  //#endregion
  public anyTextTsvector: string | undefined = undefined;

  //#region CORE: links
  @pycsw({
    profile: 'mc_3d',
    xmlElement: 'mc:links',
    queryableField: 'mc:links',
    pycswField: 'pycsw:links',
  })
  @catalogDB({
    column: {
      name: 'links',
      type: 'text',
      nullable: false,
    },
    field: {
      overrideType: TsTypes.STRING,
    },
  })
  @tsTypes({
    mappingType: TsTypes.LINKS,
  })
  @graphql({
    nullable: true,
  })
  @fieldConfig({
    category: FieldCategory.GENERAL,
    complexType: TsTypes.LINKS,
    isAutoGenerated: true,
  })
  //#endregion
  public links: Link[] | undefined = undefined;

  public constructor() {
    super();
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new Pycsw3DCatalogRecord();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<Pycsw3DCatalogRecord>(layer, prop);
      if (pycswMap) {
        ret.push({
          prop: prop,
          ...pycswMap,
        });
      }
    }
    return ret;
  }

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const layer = new Pycsw3DCatalogRecord();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<Pycsw3DCatalogRecord>(layer, prop);
      if (fieldConfigMap) {
        const fieldConfig = { prop: prop, ...fieldConfigMap };
        if (fieldConfigMap.complexType) {
          fieldConfig.subFields = getFieldConfigClassInfo(fieldConfigMap.complexType.value);
        }
        ret.push(fieldConfig);
      }
    }
    return ret;
  }

  public static getShpMappings(): IPropSHPMapping[] {
    return [];
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
    return getCatalogDBEntityMapping(Pycsw3DCatalogRecord);
  }
}
