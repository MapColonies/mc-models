import { z } from 'zod';
import { ExternalLayerSourceSchema, ResourceResolutionStatus } from '@map-colonies/app-shared';
import { TsTypes } from '../layerMetadata';
import { FieldCategory } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { createAnnotatedZodObject, registerAnnotatedZodObject, ZodFieldAnnotations } from '../common/zod';
import { EXTERNAL_LAYER_DETAILS_TYPE } from './basemapTypes';

/**
 * Registered under the name 'ExternalLayerSource' - the other branch of the output-side
 * `BasemapLayerSourceOutput` union (see `basemapTypes.ts`'s `BASEMAP_LAYER_SOURCE_UNION_TYPE`), matching
 * `catalog-web-app-bff`'s existing hand-written `ExternalLayerSource` ObjectType: external sources need
 * no catalog lookup, so `status` is always RESOLVED and there is no `layer`/`capabilities`.
 *
 * Extended straight from app-shared's own `ExternalLayerSourceSchema` (`type`/`details`), matching the
 * real output union's own literal `status: RESOLVED` constraint exactly rather than the wider enum.
 *
 * `skipInputType`: same reasoning as `catalogResourceSourceModel.ts` - no standalone InputType, the flat
 * merge (`BasemapLayerSourceInput`) covers the write side for both branches.
 */
const externalLayerSourceSchema = ExternalLayerSourceSchema.extend({
  status: z.literal(ResourceResolutionStatus.RESOLVED),
});

type ExternalLayerSourceShape = typeof externalLayerSourceSchema.shape;

const externalLayerSourceAnnotations: ZodFieldAnnotations<ExternalLayerSourceShape> = {
  type: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.SOURCE_TYPE,
  },
  status: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.RESOURCE_RESOLUTION_STATUS,
  },
  details: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true, complexType: EXTERNAL_LAYER_DETAILS_TYPE },
    graphql: { nullable: false },
    tsType: EXTERNAL_LAYER_DETAILS_TYPE,
  },
};

export const externalLayerSourceModel = registerAnnotatedZodObject(
  createAnnotatedZodObject(externalLayerSourceSchema, externalLayerSourceAnnotations, 'ExternalLayerSource', {
    skipInputType: true,
  })
);
