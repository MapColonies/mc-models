import { z } from 'zod';
import { CatalogResourceLayerSourceSchema, ResourceResolutionStatus } from '@map-colonies/app-shared';
import { TsTypes } from '../layerMetadata';
import { FieldCategory } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { createAnnotatedZodObject, registerAnnotatedZodObject, ZodFieldAnnotations } from '../common/zod';
import { CAPABILITY_TYPE, LAYER_RASTER_RECORD_TYPE, RASTER_UNIQUENESS_TYPE } from './basemapTypes';

/**
 * Registered under the name 'CatalogResourceSource' - one of the two branches of the real output-side
 * `BasemapLayerSourceOutput` union (see `basemapTypes.ts`'s `BASEMAP_LAYER_SOURCE_UNION_TYPE`), matching
 * `catalog-web-app-bff`'s existing hand-written `CatalogResourceSource` ObjectType exactly: `layer`/
 * `capabilities` are nullable here (rather than three separate RESOLVED/UNRESOLVED GraphQL shapes) since
 * `status` alone already tells the client which case it is - the same simplification `basemap.ts` made.
 *
 * `type`/`domain`/`uniqueness` are extended straight from app-shared's own `CatalogResourceLayerSourceSchema`
 * (the real branch both RESOLVED/UNRESOLVED output variants share) rather than re-declared by hand, so this
 * stays a true extension of the entity definition, not a parallel approximation of it.
 *
 * `skipObjectType: false` is the default (this branch IS an ObjectType) but it has no legitimate
 * standalone InputType - a client never sends a "resolved catalog resource source" as a parameter, only
 * the flat merge (`BasemapLayerSourceInput`, see `basemapLayerSourceModel.ts`) - hence `skipInputType`.
 */
const catalogResourceSourceSchema = CatalogResourceLayerSourceSchema.extend({
  status: z.nativeEnum(ResourceResolutionStatus),
  layer: z.unknown().nullable(),
  capabilities: z.unknown().nullable(),
});

type CatalogResourceSourceShape = typeof catalogResourceSourceSchema.shape;

const catalogResourceSourceAnnotations: ZodFieldAnnotations<CatalogResourceSourceShape> = {
  type: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.SOURCE_TYPE,
  },
  domain: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.DOMAIN,
  },
  uniqueness: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true, complexType: RASTER_UNIQUENESS_TYPE },
    graphql: { nullable: false },
    tsType: RASTER_UNIQUENESS_TYPE,
  },
  status: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.RESOURCE_RESOLUTION_STATUS,
  },
  layer: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false, complexType: LAYER_RASTER_RECORD_TYPE },
    graphql: { nullable: true },
    tsType: LAYER_RASTER_RECORD_TYPE,
  },
  capabilities: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false, complexType: CAPABILITY_TYPE },
    graphql: { nullable: true },
    tsType: CAPABILITY_TYPE,
  },
};

export const catalogResourceSourceModel = registerAnnotatedZodObject(
  createAnnotatedZodObject(catalogResourceSourceSchema, catalogResourceSourceAnnotations, 'CatalogResourceSource', {
    skipInputType: true,
  })
);
