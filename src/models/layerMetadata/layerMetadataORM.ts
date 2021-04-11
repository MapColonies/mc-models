import { IPycswModel } from '../pycsw/interfaces/pycswModel';
import { catalogDB } from './decorators/catalogDB.decorator';
import { LayerMetadata } from './layerMetadata';

export class LayerMetadataORM extends LayerMetadata implements IPycswModel {
  @catalogDB({
    table: 'records',
    column: {
      name: 'typename',
      type: 'text',
    },
  })
  public typeName?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'schema',
      type: 'text',
    },
  })
  public schema?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'mdsource',
      type: 'text',
    },
  })
  public mdSource?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'xml',
      type: 'text',
    },
  })
  public xml?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'anytext',
      type: 'text',
    },
  })
  public anyText?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'insert_date',
      type: 'timestamp without time zone',
    },
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
  public wktGeometry?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'links',
      type: 'text',
      nullable: true,
    },
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
  public wkbGeometry?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'title',
      type: 'text',
      nullable: true,
    },
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
  public type?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'srs',
      type: 'text',
      nullable: true,
    },
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
  public producerName?: string = undefined;

  @catalogDB({
    table: 'records',
    column: {
      name: 'project_name',
      type: 'text',
      nullable: true,
    },
  })
  public projectName?: string = undefined;

  public constructor() {
    super();
  }
}
