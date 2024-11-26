/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Polygon } from 'geojson';
import { z } from 'zod';
import { VALIDATIONS } from '../../../constants';

export const partSchema = z
  .object({
    sourceId: z.string({ message: 'Source id should be a string' }).optional(),
    sourceName: z.string({ message: 'Source name should be a string' }).min(1, { message: 'Source name should have length of at least 1' }),
    description: z.string({ message: 'Description should be a string' }).optional(),
    imagingTimeBeginUTC: z.coerce.date({ message: 'Imaging time begin UTC should be a datetime' }),
    imagingTimeEndUTC: z.coerce.date({ message: 'Imaging time end UTC should be a datetime' }),
    resolutionDegree: z
      .number({ message: 'Resolution degree should be a number' })
      .min(VALIDATIONS.resolutionDeg.min as number, {
        message: `Resolution degree should not be less than ${VALIDATIONS.resolutionDeg.min as number}`,
      })
      .max(VALIDATIONS.resolutionDeg.max as number, {
        message: `Resolution degree should not be larger than ${VALIDATIONS.resolutionDeg.max as number}`,
      }),
    resolutionMeter: z
      .number({ message: 'Resolution meter should be a number' })
      .min(VALIDATIONS.resolutionMeter.min as number, {
        message: `Resolution meter should not be less than ${VALIDATIONS.resolutionMeter.min as number}`,
      })
      .max(VALIDATIONS.resolutionMeter.max as number, {
        message: `Resolution meter should not be larger than ${VALIDATIONS.resolutionMeter.max as number}`,
      }),
    sourceResolutionMeter: z
      .number({ message: 'Source resolution meter should be a number' })
      .min(VALIDATIONS.resolutionMeter.min as number, {
        message: `Source resolution meter should not be less than ${VALIDATIONS.resolutionMeter.min as number}`,
      })
      .max(VALIDATIONS.resolutionMeter.max as number, {
        message: `Source resolution meter should not be larger than ${VALIDATIONS.resolutionMeter.max as number}`,
      }),
    horizontalAccuracyCE90: z
      .number({ message: 'Horizontal accuracy CE90 should be a number' })
      .min(VALIDATIONS.horizontalAccuracyCE90.min, {
        message: `Horizontal accuracy CE90 should not be less than ${VALIDATIONS.horizontalAccuracyCE90.min}`,
      })
      .max(VALIDATIONS.horizontalAccuracyCE90.max, {
        message: `Horizontal accuracy CE90 should not be larger than ${VALIDATIONS.horizontalAccuracyCE90.max}`,
      }),
    sensors: z
      .array(
        z.string({ message: 'Sensors should be an array of strings' }).regex(new RegExp(VALIDATIONS.sensor.pattern), {
          message: 'Sensors should be an array with items not starting or ending with whitespace characters',
        }),
        { message: 'Sensors should be an array' }
      )
      .min(1, { message: 'Sensors should have an array length of at least 1' }),
    countries: z
      .array(z.string({ message: 'Countries should be an array of strings' }).min(1, { message: 'Countries should have length of at least 1' }), {
        message: 'Countries should be an array',
      })
      .optional(),
    cities: z
      .array(z.string({ message: 'Cities should be an array of strings' }).min(1, { message: 'Cities should have length of at least 1' }), {
        message: 'Cities should be an array',
      })
      .optional(),
    footprint: z.custom<Polygon>(),
  })
  .refine((part) => part.imagingTimeBeginUTC <= part.imagingTimeEndUTC && part.imagingTimeEndUTC <= new Date(), {
    message: 'Imaging time begin UTC should be less than or equal to imaging time end UTC and both less than or equal to current timestamp',
  })
  .describe('partSchema');
