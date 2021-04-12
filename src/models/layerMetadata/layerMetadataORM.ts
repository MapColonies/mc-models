import { IPycswModel } from '../pycsw/interfaces/pycswModel';
import { catalogDB, getCatalogDBMapping } from './decorators/catalogDB.decorator';
import { getTsTypesMapping, TsTypes, tsTypes } from './decorators/tsTypes.decorator';
import { IPropCatalogDBMapping, LayerMetadata } from './layerMetadata';

export class LayerMetadataORM extends LayerMetadata implements IPycswModel {
  @catalogDB({
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
    column: {
      name: 'links',
      type: 'text',
      nullable: true,
    },
  })
  @tsTypes({
    mappingType: TsTypes.STRING,
  })
  public links?: string = undefined;

  @catalogDB({
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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
    table: 'records',
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

  public static getORMCatalogDBMappings(): IPropCatalogDBMapping[] {
    const ret = [];
    const layer = new LayerMetadataORM();
    for (const prop in layer) {
      const catalogDbMap = getCatalogDBMapping<LayerMetadataORM>(layer, prop);
      const tsTypesMap = getTsTypesMapping<LayerMetadataORM>(layer, prop);
      if (catalogDbMap && tsTypesMap) {
        ret.push({
          prop: prop,
          ...catalogDbMap,
          ...tsTypesMap
        });
      }
    }
    return ret;
  }
}
