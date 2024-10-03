/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z } from 'zod';
import { GeoJSON, Polygon } from 'geojson';
import { VALIDATIONS } from '../../../constants';

export const partSchema = z.object({
  sourceId: z.string().optional(),
  sourceName: z.string().min(1),
  description: z.string().optional(),
  imagingTimeBeginUTC: z.coerce.date(),
  imagingTimeEndUTC: z.coerce.date(),
  resolutionDegree: z
    .number()
    .min(VALIDATIONS.resolutionDeg.min as number)
    .max(VALIDATIONS.resolutionDeg.max as number),
  resolutionMeter: z
    .number()
    .min(VALIDATIONS.resolutionMeter.min as number)
    .max(VALIDATIONS.resolutionMeter.max as number),
  sourceResolutionMeter: z
    .number()
    .min(VALIDATIONS.resolutionMeter.min as number)
    .max(VALIDATIONS.resolutionMeter.max as number),
  horizontalAccuracyCE90: z.number().min(VALIDATIONS.horizontalAccuracyCE90.min).max(VALIDATIONS.horizontalAccuracyCE90.max),
  sensors: z.array(z.string().min(1)).min(1),
  countries: z.array(z.string().min(1)).optional(),
  cities: z.array(z.string().min(1)).optional(),
  footprint: z.custom<Polygon>(),
});
