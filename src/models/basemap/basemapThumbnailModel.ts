import { BasemapThumbnailSchema } from '@map-colonies/app-shared';
import { TsTypes } from '../layerMetadata';
import { FieldCategory } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { createAnnotatedZodObject, registerAnnotatedZodObject, ZodFieldAnnotations } from '../common/zod';

type BasemapThumbnailShape = typeof BasemapThumbnailSchema.shape;

/**
 * Registered under the name 'BasemapThumbnail', matching the `tsType`/`complexType` the
 * `thumbnail` field of `basemapModel.ts` points at, so `getGraphQLClassMapping()` /
 * `getFieldConfigClassInfo()` can actually resolve it.
 */
const basemapThumbnailAnnotations: ZodFieldAnnotations<BasemapThumbnailShape> = {
  url: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
  },
  width: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.NUMBER,
  },
  height: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
    tsType: TsTypes.NUMBER,
  },
};

export const basemapThumbnailModel = registerAnnotatedZodObject(
  createAnnotatedZodObject(BasemapThumbnailSchema, basemapThumbnailAnnotations, 'BasemapThumbnail')
);
