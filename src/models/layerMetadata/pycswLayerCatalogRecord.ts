import { IPycswCoreModel } from '../pycsw/interfaces/pycswCoreModel';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { IOrmCatalog } from '../common/interfaces/ormCatalog.interface';
import { graphql } from '../common/decorators/property/graphql.decorator';
import { graphqlClass } from '../common/decorators/property/classGraphql.decorator';
import { Link } from './link';
import { catalogDB, getCatalogDBMapping } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';
import { IPropPYCSWMapping, LayerMetadata } from './layerMetadata';
import { getCatalogDBEntityMapping, catalogDBEntity, ICatalogDBEntityMapping } from './decorators/class/catalogDBEntity.decorator';
import { getPyCSWMapping, pycsw } from './decorators/property/csw.decorator';

@catalogDBEntity({
  table: 'records',
  className: 'RecordEntity',
})
@graphqlClass({ alias: 'LayerRasterRecord' })
export class PycswLayerCatalogRecord extends LayerMetadata implements IPycswCoreModel, IOrmCatalog {
  //#region CORE: id
  @pycsw({
    profile: 'mc_raster',
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
  //#endregion
  public id: string | undefined = undefined;

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
  public typeName = 'mc:MCRasterRecord';

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
  public schema: string | undefined = 'mc_raster';
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

  //#region CORE: anytext
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
  public anyText: string | undefined = undefined;

  //#region CORE: insertDate
  @catalogDB({
    column: {
      name: 'insert_date',
      type: 'timestamp without time zone',
      default: 'CURRENT_TIMESTAMP',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  @graphql({
    nullable: true,
  })
  //#endregion
  public insertDate: Date | undefined = undefined;

  //#region CORE: wktGeometry
  @catalogDB({
    column: {
      name: 'wkt_geometry',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
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
    profile: 'mc_raster',
    xmlElement: 'mc:keywords',
    queryableField: 'mc:keywords',
    pycswField: 'pycsw:Keywords',
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
  //#endregion
  public keywords: string | undefined = undefined;

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
    profile: 'mc_raster',
    xmlElement: 'mc:links',
    queryableField: 'mc:links',
    pycswField: 'pycsw:Links',
  })
  @catalogDB({
    column: {
      name: 'links',
      type: 'text',
      nullable: true,
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
  //#endregion
  public links: Link[] | undefined = undefined;

  public constructor() {
    super();
  }

  public static getPyCSWMappings(): IPropPYCSWMapping[] {
    const ret = [];
    const layer = new PycswLayerCatalogRecord();
    for (const prop in layer) {
      const pycswMap = getPyCSWMapping<PycswLayerCatalogRecord>(layer, prop);
      if (pycswMap) {
        ret.push({
          prop: prop,
          ...pycswMap,
        });
      }
    }
    return ret;
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
    return getCatalogDBEntityMapping(PycswLayerCatalogRecord);
  }
}
