import type { GeoJSON, MultiPolygon, Polygon } from 'geojson';
import type { IMetadataCommonModel } from './interfaces/metadataCommonModel';
import type { ILayerMetadata } from './layerMetadata';

type NonNullableRecord<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

type FlatArraysInRecord<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]: T[K] extends (infer I)[] ? I : T[K];
};

type MakePolygonalRecord<T, P extends keyof T, Q = GeoJSON> = NonNullable<T[P]> extends Q ? Record<P, Polygon | MultiPolygon> : never;

export interface AggregationLayerMetadata
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
    MakePolygonalRecord<IMetadataCommonModel, 'footprint'> {}
