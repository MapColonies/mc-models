/* eslint-disable @typescript-eslint/no-magic-numbers */
import { zoomLevelToResolutionDeg, zoomLevelToResolutionMeter } from '@map-colonies/mc-utils';

export const VALIDATIONS = {
  boundingBox: {
    pattern: '^-?(0|[1-9]\\d*)(\\.\\d*)?,-?(0|[1-9]\\d*)(\\.\\d*)?,-?(0|[1-9]\\d*)(\\.\\d*)?,-?(0|[1-9]\\d*)(\\.\\d*)?$',
  },
  classification: {
    pattern: '^[0-9]$|^[1-9][0-9]$|^(100)$',
  },
  fileNames: {
    pattern: '^.+\\.[Gg][Pp][Kk][Gg]$',
  },
  horizontalAccuracyCE90: {
    min: 0.01,
    max: 4000,
  },
  productId: {
    pattern: '^[A-Za-z]{1}[A-Za-z0-9_]{0,37}$',
  },
  productVersion: {
    pattern: '^[1-9]\\d*(\\.(0|[1-9]\\d?))?$',
  },
  resolutionDeg: {
    min: zoomLevelToResolutionDeg(22),
    max: zoomLevelToResolutionDeg(0),
  },
  resolutionMeter: {
    min: zoomLevelToResolutionMeter(22),
    max: zoomLevelToResolutionMeter(0),
  },
  scale: {
    min: 0,
    max: 100000000,
  },
  sensor: {
    pattern: '^(?!\\s).+(?<!\\s)$',
  },
  polygonPartsEntityName: {
    pattern: '^[a-zA-Z][a-zA-Z0-9_]{0,62}$',
  },
};
