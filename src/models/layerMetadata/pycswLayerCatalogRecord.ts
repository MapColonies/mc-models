import { IPycswCoreModel } from '../pycsw/interfaces/pycswCoreModel';
import { IPropCatalogDBMapping } from '../common/interfaces/propCatalogDBMapping.interface';
import { IOrmCatalog } from '../common/interfaces/ormCatalog.interface';
import { graphql } from '../common/decorators/graphQL/graphql.decorator';
import { graphqlClass } from '../common/decorators/graphQL/classGraphql.decorator';
import { FieldCategory, fieldConfig, getFieldConfig, IPropFieldConfigInfo } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { getFieldConfigClassInfo } from '../common/decorators/fieldConfig/classFieldConfig.decorator';
import { NewRasterLayerMetadata, UpdateRasterLayerMetadata } from '../raster/ingestion';
import { Link } from './link';
import { catalogDB, getCatalogDBMapping } from './decorators/property/catalogDB.decorator';
import { getTsTypesMapping, TsTypes, tsTypes } from './decorators/property/tsTypes.decorator';
import { IPropPYCSWMapping, LayerMetadata } from './layerMetadata';
import { getCatalogDBEntityMapping, catalogDBEntity, ICatalogDBEntityMapping } from './decorators/class/catalogDBEntity.decorator';
import { getPyCSWMapping, pycsw } from './decorators/property/csw.decorator';
import { IPropSHPMapping } from './decorators/property/shp.decorator';
import { ProductType, Transparency } from './enums';

@catalogDBEntity({
  table: 'records',
  className: 'RecordEntity',
})
@graphqlClass({ alias: 'LayerRasterRecord' })
export class PycswLayerCatalogRecord extends LayerMetadata implements IPycswCoreModel, IOrmCatalog {
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
  public typeName = 'mc_MCRasterRecord';

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
  @pycsw({
    profile: 'mc_raster',
    xmlElement: 'mc:insertDate',
    queryableField: 'mc:insertDate',
    pycswField: 'pycsw:InsertDate',
  })
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
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isAutoGenerated: true,
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
  @fieldConfig({
    category: FieldCategory.GENERAL,
    isManuallyEditable: true,
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

  public static getFieldConfigs(): IPropFieldConfigInfo[] {
    const ret = [];
    const newLayerMetadataProps = Object.keys(new NewRasterLayerMetadata('', ProductType.ORTHOPHOTO, '', '', Transparency.TRANSPARENT, '', [''], ''));
    const updatedLayerMetadataProps = Object.keys(new UpdateRasterLayerMetadata(''));
    const layer = new PycswLayerCatalogRecord();
    for (const prop in layer) {
      const fieldConfigMap = getFieldConfig<PycswLayerCatalogRecord>(layer, prop);
      if (fieldConfigMap) {
        const fieldConfig = {
          prop: prop,
          ...fieldConfigMap,
          isCreateEssential: newLayerMetadataProps.includes(prop),
          isUpdateEssential: updatedLayerMetadataProps.includes(prop),
        };
        if (fieldConfigMap.complexType) {
          fieldConfig.subFields = getFieldConfigClassInfo(fieldConfigMap.complexType.value);
        }
        ret.push(fieldConfig);
      }
    }
    return ret as IPropFieldConfigInfo[];
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
    return getCatalogDBEntityMapping(PycswLayerCatalogRecord);
  }
}
