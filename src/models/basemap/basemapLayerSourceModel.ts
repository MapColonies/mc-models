import { z } from 'zod';
import { ExternalLayerDetailsSchema, RasterUniquenessSchema, SourceType } from '@map-colonies/app-shared';
import { Domain } from '@map-colonies/types';
import { TsTypes } from '../layerMetadata';
import { FieldCategory } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { createAnnotatedZodObject, registerAnnotatedZodObject, ZodFieldAnnotations } from '../common/zod';
import { EXTERNAL_LAYER_DETAILS_TYPE, RASTER_UNIQUENESS_TYPE } from './basemapTypes';

/**
 * `BasemapLayerSourceInputSchema` (in app-shared) is a zod discriminated union of
 * `CatalogResourceLayerSourceSchema`/`ExternalLayerSourceSchema`, but GraphQL has no input-type union
 * of its own. `catalog-web-app-bff`'s existing hand-written `BasemapLayerSourceInput`
 * (src/graphql/basemap.ts) already settled this: one flat input class with `type` required and every
 * other field optional, merging both branches' fields side by side. This schema mirrors that shape -
 * it exists purely for generation (and as a reasonably faithful runtime shape check), not as a
 * replacement for app-shared's real discriminated-union validation.
 *
 * `skipObjectType`: the real output entity is the union of `CatalogResourceSource`/`ExternalLayerSource`
 * (see `catalogResourceSourceModel.ts`/`externalLayerSourceModel.ts`, wired together by
 * `BASEMAP_LAYER_SOURCE_UNION_TYPE` in `basemapTypes.ts`), which also uses the name 'BasemapLayerSource'
 * for its GraphQL union type - so this registration only ever contributes the InputType half.
 */
const basemapLayerSourceSchema = z.object({
  type: z.nativeEnum(SourceType),
  domain: z.nativeEnum(Domain).optional(),
  uniqueness: RasterUniquenessSchema.optional(),
  details: ExternalLayerDetailsSchema.optional(),
});

type BasemapLayerSourceShape = typeof basemapLayerSourceSchema.shape;

const basemapLayerSourceAnnotations: ZodFieldAnnotations<BasemapLayerSourceShape> = {
  type: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.SOURCE_TYPE,
  },
  domain: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false },
    graphql: { nullable: true },
    tsType: TsTypes.DOMAIN,
  },
  uniqueness: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false, complexType: RASTER_UNIQUENESS_TYPE },
    graphql: { nullable: true },
    tsType: RASTER_UNIQUENESS_TYPE,
  },
  details: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false, complexType: EXTERNAL_LAYER_DETAILS_TYPE },
    graphql: { nullable: true },
    tsType: EXTERNAL_LAYER_DETAILS_TYPE,
  },
};

export const basemapLayerSourceModel = registerAnnotatedZodObject(
  createAnnotatedZodObject(basemapLayerSourceSchema, basemapLayerSourceAnnotations, 'BasemapLayerSource', {
    skipObjectType: true,
  })
);
