import { z } from 'zod';
import { BasemapLayerInputSchema } from '@map-colonies/app-shared';
import { FieldCategory } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { createAnnotatedZodObject, registerAnnotatedZodObject, ZodFieldAnnotations } from '../common/zod';
import { BASEMAP_LAYER_SOURCE_UNION_TYPE } from './basemapTypes';

/**
 * Registered under the name 'BasemapLayer' - the real, primary entity (not the write/parameter shape).
 *
 * `id`/`order`/`opacity`/`shouldBeUsedInModelDraping` are identical between `BasemapLayerInput` (app-shared)
 * and `BasemapLayerOutput`, so extending `BasemapLayerInputSchema` reuses that real, shared base rather
 * than re-declaring it by hand. `source` is explicitly overridden to `z.unknown()`, not left as
 * `BasemapLayerInputSchema`'s own input discriminated union - this registration is the OUTPUT entity, and
 * its real `source` shape is the union below, not the input one; leaving the input union in place here
 * would silently mis-validate (and strip) real output data (`status`/`layer`/`capabilities`) if anyone
 * ever called `.parse()`/`.safeParse()` on this model. The real shape is fully described by the `tsType`/
 * `complexType` annotation instead, same as every other CLASS/UNION-typed field in this bridge.
 *
 * `source` is `PropertiesTypes.UNION`-typed: on the ObjectType side it resolves to the real
 * `CatalogResourceSource | ExternalLayerSource` union (`BasemapLayerSourceUnion`, matching
 * `catalog-web-app-bff`'s hand-written one); on the InputType side `code-generator` automatically falls
 * back to the union's `inputType` (the flat-merged 'BasemapLayerSource', see `basemapLayerSourceModel.ts`)
 * since GraphQL itself has no input unions - so this one registration yields both `BasemapLayer`
 * (ObjectType) and `BasemapLayerInput` (InputType), exactly matching `basemap.ts`'s two classes.
 */
const basemapLayerSchema = BasemapLayerInputSchema.extend({ source: z.unknown() });

type BasemapLayerShape = typeof basemapLayerSchema.shape;

const basemapLayerAnnotations: ZodFieldAnnotations<BasemapLayerShape> = {
  id: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
  },
  order: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
  },
  opacity: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
  },
  shouldBeUsedInModelDraping: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false },
    graphql: { nullable: true },
  },
  source: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true, complexType: BASEMAP_LAYER_SOURCE_UNION_TYPE },
    graphql: { nullable: false },
    tsType: BASEMAP_LAYER_SOURCE_UNION_TYPE,
  },
};

export const basemapLayerModel = registerAnnotatedZodObject(createAnnotatedZodObject(basemapLayerSchema, basemapLayerAnnotations, 'BasemapLayer'));
