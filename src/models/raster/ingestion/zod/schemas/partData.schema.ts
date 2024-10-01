/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z } from 'zod';
import { GeoJSON } from 'geojson';
import { Validations } from '../../../constants';

export const partSchema = z.object({
  sourceId: z.string().optional(),
  sourceName: z.string().min(1),
  description: z.string().optional(),
  imagingTimeBeginUTC: z.coerce.date(),
  imagingTimeEndUTC: z.coerce.date(),
  resolutionDegree: z
    .number()
    .min(Validations.resolutionDeg.min as number)
    .max(Validations.resolutionDeg.max as number),
  resolutionMeter: z
    .number()
    .min(Validations.resolutionMeter.min as number)
    .max(Validations.resolutionMeter.max as number),
  sourceResolutionMeter: z
    .number()
    .min(Validations.resolutionMeter.min as number)
    .max(Validations.resolutionMeter.max as number),
  horizontalAccuracyCE90: z.number().min(Validations.horizontalAccuracyCE90.min).max(Validations.horizontalAccuracyCE90.max),
  sensors: z.array(z.string().min(1)).min(1),
  countries: z.array(z.string().min(1)).optional(),
  cities: z.array(z.string().min(1)).optional(),
  footprint: z.custom<GeoJSON>(),
});
