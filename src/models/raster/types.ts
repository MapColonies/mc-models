import { RasterProductTypes } from './constants';

export type RasterProductTypes = (typeof RasterProductTypes)[keyof typeof RasterProductTypes];
