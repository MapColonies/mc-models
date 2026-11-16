import { RasterUniquenessSchema } from '@map-colonies/app-shared';
import { FieldCategory } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { createAnnotatedZodObject, registerAnnotatedZodObject, ZodFieldAnnotations } from '../common/zod';

type RasterUniquenessShape = typeof RasterUniquenessSchema.shape;

/**
 * Registered under the name 'RasterUniqueness', the nested subtype `CatalogResourceLayerSource.uniqueness`
 * points at.
 */
const rasterUniquenessAnnotations: ZodFieldAnnotations<RasterUniquenessShape> = {
  productId: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false },
    graphql: { nullable: true },
  },
  productType: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false },
    graphql: { nullable: true },
  },
};

export const rasterUniquenessModel = registerAnnotatedZodObject(
  createAnnotatedZodObject(RasterUniquenessSchema, rasterUniquenessAnnotations, 'RasterUniqueness')
);
