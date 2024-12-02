/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z, ZodType } from 'zod';
import { MultiPolygon, Polygon } from 'geojson';
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

export const aggregationMetadataSchema = z
  .object(
    {
      footprint: z.custom<Polygon | MultiPolygon>(),
      imagingTimeBeginUTC: z.coerce.date({ message: 'Imaging time begin UTC should be a datetime' }),
      imagingTimeEndUTC: z.coerce.date({ message: 'Imaging time end UTC should be a datetime' }),
      maxHorizontalAccuracyCE90: z
        .number({ message: 'Max horizontal accuracy CE90 should be a number' })
        .min(VALIDATIONS.horizontalAccuracyCE90.min, {
          message: `Max horizontal accuracy CE90 should not be less than ${VALIDATIONS.horizontalAccuracyCE90.min}`,
        })
        .max(VALIDATIONS.horizontalAccuracyCE90.max, {
          message: `Max horizontal accuracy CE90 should not be larger than ${VALIDATIONS.horizontalAccuracyCE90.max}`,
        }),
      maxResolutionDeg: z
        .number({ message: 'Max resolution degree should be a number' })
        .min(VALIDATIONS.resolutionDeg.min as number, {
          message: `Max resolution degree should not be less than ${VALIDATIONS.resolutionDeg.min as number}`,
        })
        .max(VALIDATIONS.resolutionDeg.max as number, {
          message: `Max resolution degree should not be larger than ${VALIDATIONS.resolutionDeg.max as number}`,
        }),
      maxResolutionMeter: z
        .number({ message: 'Max resolution meter should be a number' })
        .min(VALIDATIONS.resolutionMeter.min as number, {
          message: `Max resolution meter should not be less than ${VALIDATIONS.resolutionMeter.min as number}`,
        })
        .max(VALIDATIONS.resolutionMeter.max as number, {
          message: `Max resolution meter should not be larger than ${VALIDATIONS.resolutionMeter.max as number}`,
        }),
      minHorizontalAccuracyCE90: z
        .number({ message: 'Min horizontal accuracy CE90 should be a number' })
        .min(VALIDATIONS.horizontalAccuracyCE90.min, {
          message: `Min horizontal accuracy CE90 should not be less than ${VALIDATIONS.horizontalAccuracyCE90.min}`,
        })
        .max(VALIDATIONS.horizontalAccuracyCE90.max, {
          message: `Min horizontal accuracy CE90 should not be larger than ${VALIDATIONS.horizontalAccuracyCE90.max}`,
        }),
      minResolutionDeg: z
        .number({ message: 'Min resolution degree should be a number' })
        .min(VALIDATIONS.resolutionDeg.min as number, {
          message: `Min resolution degree should not be less than ${VALIDATIONS.resolutionDeg.min as number}`,
        })
        .max(VALIDATIONS.resolutionDeg.max as number, {
          message: `Min resolution degree should not be larger than ${VALIDATIONS.resolutionDeg.max as number}`,
        }),
      minResolutionMeter: z
        .number({ message: 'Min resolution meter should be a number' })
        .min(VALIDATIONS.resolutionMeter.min as number, {
          message: `Min resolution meter should not be less than ${VALIDATIONS.resolutionMeter.min as number}`,
        })
        .max(VALIDATIONS.resolutionMeter.max as number, {
          message: `Min resolution meter should not be larger than ${VALIDATIONS.resolutionMeter.max as number}`,
        }),
      productBoundingBox: z.string({ message: 'Product bounding box should be a string' }).regex(new RegExp(VALIDATIONS.boundingBox.pattern), {
        message: 'Product bounding box must be of the shape min_x,min_y,max_x,max_y',
      }),
      sensors: z
        .array(
          z.string({ message: 'Sensors should be an array of strings' }).regex(new RegExp(VALIDATIONS.sensor.pattern), {
            message: 'Sensors should be an array with items not starting or ending with whitespace characters',
          }),
          { message: 'Sensors should be an array' }
        )
        .min(1, { message: 'Sensors should have an array length of at least 1' }),
    },
    { message: 'Layer metadata should be an object' }
  )
  .strict()
  .refine(
    (aggregationLayerMetadata) =>
      aggregationLayerMetadata.imagingTimeBeginUTC <= aggregationLayerMetadata.imagingTimeEndUTC &&
      aggregationLayerMetadata.imagingTimeEndUTC <= new Date(),
    {
      message: 'Imaging time begin UTC should be less than or equal to imaging time end UTC and both less than or equal to current timestamp',
    }
  )
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.minHorizontalAccuracyCE90 <= aggregationLayerMetadata.maxHorizontalAccuracyCE90, {
    message: 'Min horizontal accuracy CE90 should be less than or equal to max horizontal accuracy CE90',
  })
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.minResolutionDeg <= aggregationLayerMetadata.maxResolutionDeg, {
    message: 'Min resolution degree should be less than or equal to max resolution degree',
  })
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.minResolutionMeter <= aggregationLayerMetadata.maxResolutionMeter, {
    message: 'Min resolution meter should be less than or equal to max resolution meter',
  })
  .describe('aggregationLayerMetadataSchema');

export type AggregationLayerMetadata = z.infer<typeof aggregationMetadataSchema>;
