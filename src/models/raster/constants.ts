/* eslint-disable @typescript-eslint/no-magic-numbers */
import { zoomLevelToResolutionDeg, zoomLevelToResolutionMeter } from '@map-colonies/mc-utils';

export const VALIDATIONS = {
  resolutionMeter: {
    min: zoomLevelToResolutionMeter(22),
    max: zoomLevelToResolutionMeter(0),
  },
  resolutionDeg: {
    min: zoomLevelToResolutionDeg(22),
    max: zoomLevelToResolutionDeg(0),
  },
  horizontalAccuracyCE90: {
    min: 0.01,
    max: 4000,
  },
  productId: {
    pattern: '^[A-Za-z]{1}[A-Za-z0-9_]{0,62}$',
  },
  productVersion: {
    pattern: '^[1-9]\\d*(\\.(0|[1-9]\\d?))?$',
  },
};
