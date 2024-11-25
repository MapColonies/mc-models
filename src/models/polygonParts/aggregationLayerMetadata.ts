import type { GeoJSON, MultiPolygon, Polygon } from 'geojson';
import type { IMetadataCommonModel } from '../layerMetadata/interfaces/metadataCommonModel';
import type { ILayerMetadata } from '../layerMetadata/layerMetadata';

type NonNullableRecord<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]-?: NonNullable<T[K]>;
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
    NonNullableRecord<Pick<ILayerMetadata, 'sensors'>>,
    MakePolygonalRecord<IMetadataCommonModel, 'footprint'> {}
