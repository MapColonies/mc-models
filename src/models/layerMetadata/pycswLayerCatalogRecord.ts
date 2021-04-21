import { IPycswCoreModel } from '../pycsw/interfaces/pycswCoreModel';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { IOrmCatalog } from '../common/interfaces/ormCatalog.interface';
import { Link } from '../common/interfaces/link.interface';
import { catalogDB, getCatalogDBMapping } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';
import { LayerMetadata } from './layerMetadata';
import { getCatalogDBEntityMapping, catalogDBEntity, ICatalogDBEntityMapping } from './decorators/class/catalogDBEntity.decorator';

@catalogDBEntity({
  table: 'records',
})
export class PycswLayerCatalogRecord extends LayerMetadata implements IPycswCoreModel, IOrmCatalog {
  @catalogDB({
    column: {
      name: 'typename',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public typeName?: string = undefined;

  @catalogDB({
    column: {
      name: 'schema',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public schema?: string = undefined;

  @catalogDB({
    column: {
      name: 'mdsource',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public mdSource?: string = undefined;

  @catalogDB({
    column: {
      name: 'xml',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public xml?: string = undefined;

  @catalogDB({
    column: {
      name: 'anytext',
      type: 'text',
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public anyText?: string = undefined;

  @catalogDB({
    column: {
      name: 'insert_date',
      type: 'timestamp without time zone',
    },
  })
  @tsTypes({
    mappingType: TsTypes.DATE,
  })
  public insertDate?: Date = undefined;

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
  public wktGeometry?: string = undefined;

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
  public links?: Link[] = undefined;

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
  public anyTextTsvector?: string = undefined;

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
  public wkbGeometry?: string = undefined;

  @catalogDB({
    column: {
      name: 'title',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public title?: string = undefined;

  @catalogDB({
    column: {
      name: 'type',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public type?: string = undefined;

  @catalogDB({
    column: {
      name: 'srs',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public srs?: string = undefined;

  @catalogDB({
    column: {
      name: 'producer_name',
      type: 'text',
      defaultValue: 'IDFMU',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public producerName?: string = undefined;

  @catalogDB({
    column: {
      name: 'project_name',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public projectName?: string = undefined;

  public constructor() {
    super();
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
