import type { IMetadataCommonModel } from './interfaces/metadataCommonModel';
import type { ILayerMetadata } from './layerMetadata';

type NonNullableRecord<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

type FlatArraysInRecord<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]: T[K] extends (infer I)[] ? I : T[K];
};

export interface AggregatedLayerMetadata
  extends NonNullableRecord<
      Pick<
        ILayerMetadata,
        | 'imagingTimeBeginUTC'
        | 'imagingTimeEndUTC'
        | 'maxResolutionDeg'
        | 'minResolutionDeg'
        | 'maxResolutionMeter'
        | 'minResolutionMeter'
        | 'maxHorizontalAccuracyCE90'
        | 'minHorizontalAccuracyCE90'
        | 'productBoundingBox'
      >
    >,
    FlatArraysInRecord<NonNullableRecord<Pick<ILayerMetadata, 'sensors'>>>,
    NonNullableRecord<Pick<IMetadataCommonModel, 'footprint'>> {}
