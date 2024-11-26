import type { MultiPolygon, Polygon } from 'geojson';
import { z, type ZodType } from 'zod';
import type { AggregationLayerMetadata } from '../../../../polygonParts/aggregationLayerMetadata';
import { VALIDATIONS } from '../../../constants';

export const aggregationLayerMetadataSchema: ZodType<AggregationLayerMetadata> = z
  .object(
    {
      footprint: z.custom<Polygon | MultiPolygon>(),
      imagingTimeBeginUTC: z.coerce.date({ message: 'Aggregation of imaging time begin UTC should be a datetime' }),
      imagingTimeEndUTC: z.coerce.date({ message: 'Aggregation of imaging time end UTC should be a datetime' }),
      maxHorizontalAccuracyCE90: z
        .number({ message: 'Aggregation of max horizontal accuracy CE90 should be a number' })
        .min(VALIDATIONS.horizontalAccuracyCE90.min, {
          message: `Aggregation of max horizontal accuracy CE90 should not be less than ${VALIDATIONS.horizontalAccuracyCE90.min}`,
        })
        .max(VALIDATIONS.horizontalAccuracyCE90.max, {
          message: `Aggregation of max horizontal accuracy CE90 should not be larger than ${VALIDATIONS.horizontalAccuracyCE90.max}`,
        }),
      maxResolutionDeg: z
        .number({ message: 'Aggregation of max resolution degree should be a number' })
        .min(VALIDATIONS.resolutionDeg.min as number, {
          message: `Aggregation of max resolution degree should not be less than ${VALIDATIONS.resolutionDeg.min as number}`,
        })
        .max(VALIDATIONS.resolutionDeg.max as number, {
          message: `Aggregation of max resolution degree should not be larger than ${VALIDATIONS.resolutionDeg.max as number}`,
        }),
      maxResolutionMeter: z
        .number({ message: 'Aggregation of max resolution meter should be a number' })
        .min(VALIDATIONS.resolutionMeter.min as number, {
          message: `Aggregation of max resolution meter should not be less than ${VALIDATIONS.resolutionMeter.min as number}`,
        })
        .max(VALIDATIONS.resolutionMeter.max as number, {
          message: `Aggregation of max resolution meter should not be larger than ${VALIDATIONS.resolutionMeter.max as number}`,
        }),
      minHorizontalAccuracyCE90: z
        .number({ message: 'Aggregation of min horizontal accuracy CE90 should be a number' })
        .min(VALIDATIONS.horizontalAccuracyCE90.min, {
          message: `Aggregation of min horizontal accuracy CE90 should not be less than ${VALIDATIONS.horizontalAccuracyCE90.min}`,
        })
        .max(VALIDATIONS.horizontalAccuracyCE90.max, {
          message: `Aggregation of min horizontal accuracy CE90 should not be larger than ${VALIDATIONS.horizontalAccuracyCE90.max}`,
        }),
      minResolutionDeg: z
        .number({ message: 'Aggregation of min resolution degree should be a number' })
        .min(VALIDATIONS.resolutionDeg.min as number, {
          message: `Aggregation of min resolution degree should not be less than ${VALIDATIONS.resolutionDeg.min as number}`,
        })
        .max(VALIDATIONS.resolutionDeg.max as number, {
          message: `Aggregation of min resolution degree should not be larger than ${VALIDATIONS.resolutionDeg.max as number}`,
        }),
      minResolutionMeter: z
        .number({ message: 'Aggregation of min resolution meter should be a number' })
        .min(VALIDATIONS.resolutionMeter.min as number, {
          message: `Aggregation of min resolution meter should not be less than ${VALIDATIONS.resolutionMeter.min as number}`,
        })
        .max(VALIDATIONS.resolutionMeter.max as number, {
          message: `Aggregation of min resolution meter should not be larger than ${VALIDATIONS.resolutionMeter.max as number}`,
        }),
      productBoundingBox: z
        .string({ message: 'Aggregation of product bounding box should be a string' })
        .regex(new RegExp(VALIDATIONS.boundingBox.pattern), {
          message: 'Aggregation of product bounding box must be of the shape min_x,min_y,max_x,max_y',
        }),
      sensors: z
        .array(
          z.string({ message: 'Aggregation of sensors should be an array of strings' }).regex(new RegExp(VALIDATIONS.sensor.pattern), {
            message: 'Aggregation of sensors should be an array with items not starting or ending with a whitespace',
          }),
          { message: 'Aggregation of sensors should be an array' }
        )
        .min(1, { message: 'Aggregation of sensors should have an array length of at least 1' }),
    },
    { message: 'Aggregation of layer metadata should be an object' }
  )
  .strict()
  .refine(
    (aggregationLayerMetadata) =>
      aggregationLayerMetadata.imagingTimeBeginUTC <= aggregationLayerMetadata.imagingTimeEndUTC &&
      aggregationLayerMetadata.imagingTimeEndUTC <= new Date(),
    { message: 'Aggregation of imaging time begin UTC should be less than or equal to imaging time end UTC and both less than current timestamp' }
  )
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.minHorizontalAccuracyCE90 <= aggregationLayerMetadata.maxHorizontalAccuracyCE90, {
    message: 'Aggregation of min horizontal accuracy CE90 should be less than or equal to max horizontal accuracy CE90',
  })
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.minResolutionDeg <= aggregationLayerMetadata.maxResolutionDeg, {
    message: 'Aggregation of min resolution degree should be less than or equal to max resolution degree',
  })
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.minResolutionMeter <= aggregationLayerMetadata.maxResolutionMeter, {
    message: 'Aggregation of min resolution meter should be less than or equal to max resolution meter',
  })
  .describe('aggregationLayerMetadataSchema');
