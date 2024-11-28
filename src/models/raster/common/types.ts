import type { ProductType } from '../../layerMetadata';
import { RASTER_PRODUCT_TYPES } from './constants';

export type EnsureType<T extends Expected, Expected> = T;

export type RasterProductType = Extract<`${ProductType}`, EnsureType<(typeof RASTER_PRODUCT_TYPES)[number], `${ProductType}`>>;
