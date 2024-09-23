/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z } from 'zod';
import { zoomLevelToResolutionDeg, zoomLevelToResolutionMeter } from '@map-colonies/mc-utils';
import { GeoJSON } from 'geojson';

const resolutionMeterRange = { min: zoomLevelToResolutionMeter(22), max: zoomLevelToResolutionMeter(0) };
const resolutionDegRange = { min: zoomLevelToResolutionDeg(22), max: zoomLevelToResolutionDeg(0) };
const horizontalAccuracyCE90Range = { min: 0.01, max: 4000 };

export const partSchema = z.object({
  sourceId: z.string().optional(),
  sourceName: z.string().min(1),
  description: z.string().optional(),
  imagingTimeBeginUTC: z.coerce.date(),
  imagingTimeEndUTC: z.coerce.date(),
  resolutionDegree: z
    .number()
    .min(resolutionDegRange.min as number)
    .max(resolutionDegRange.max as number),
  resolutionMeter: z
    .number()
    .min(resolutionMeterRange.min as number)
    .max(resolutionMeterRange.max as number),
  sourceResolutionMeter: z
    .number()
    .min(resolutionMeterRange.min as number)
    .max(resolutionMeterRange.max as number),
  horizontalAccuracyCE90: z.number().min(horizontalAccuracyCE90Range.min).max(horizontalAccuracyCE90Range.max),
  sensors: z.array(z.string().min(1)).min(1),
  countries: z.array(z.string().min(1)).optional(),
  cities: z.array(z.string().min(1)).optional(),
  geometry: z.custom<GeoJSON>(),
});
