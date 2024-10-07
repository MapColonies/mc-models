/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z } from 'zod';
import { VALIDATIONS } from '../../../constants';
import { ProductType, Transparency } from '../../../../layerMetadata/enums';

export const newMetadataSchema = z
  .object({
    productId: z.string().regex(new RegExp(VALIDATIONS.productId.pattern)),
    productName: z.string().min(1),
    productType: z.nativeEnum(ProductType),
    srs: z.literal('4326'),
    srsName: z.literal('WGS84GEO'),
    transparency: z.nativeEnum(Transparency),
    region: z.array(z.string().min(1)).min(1),
    classification: z.string().regex(new RegExp(VALIDATIONS.classification.pattern)),
    producerName: z.string().optional(),
    scale: z.number().min(VALIDATIONS.scale.min).max(VALIDATIONS.scale.max).optional(),
    productSubType: z.string().optional(),
    description: z.string().optional(),
  })
  .describe('newMetadataSchema');

export const updateMetadataSchema = z
  .object({
    classification: z.string().regex(new RegExp(VALIDATIONS.classification.pattern)),
  })
  .describe('updateMetadataSchema');
