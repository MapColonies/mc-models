import { ExternalLayerDetailsSchema } from '@map-colonies/app-shared';
import { FieldCategory } from '../common/decorators/fieldConfig/fieldConfig.decorator';
import { createAnnotatedZodObject, registerAnnotatedZodObject, ZodFieldAnnotations } from '../common/zod';

type ExternalLayerDetailsShape = typeof ExternalLayerDetailsSchema.shape;

/**
 * Registered under the name 'ExternalLayerDetails', the nested subtype `ExternalLayerSource.details`
 * points at.
 */
const externalLayerDetailsAnnotations: ZodFieldAnnotations<ExternalLayerDetailsShape> = {
  protocol: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
  },
  name: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
  },
  url: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: true },
    graphql: { nullable: false },
  },
  extras: {
    fieldConfig: { category: FieldCategory.GENERAL, isRequired: false },
    graphql: { nullable: true },
  },
};

export const externalLayerDetailsModel = registerAnnotatedZodObject(
  createAnnotatedZodObject(ExternalLayerDetailsSchema, externalLayerDetailsAnnotations, 'ExternalLayerDetails')
);
