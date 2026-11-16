import { IDescribeTsType, PropertiesTypes } from '../layerMetadata';

/**
 * Shared `IDescribeTsType` descriptors for the basemap subtypes, reused by both the `tsType`
 * (GraphQL/ts-type side) and `fieldConfig.complexType` (subFields-resolution side) of whichever
 * field references them - same as the class-based models' `TsTypes.LINKS`-style constants do.
 */
export const BASEMAP_THUMBNAIL_TYPE: IDescribeTsType = { value: 'BasemapThumbnail', type: PropertiesTypes.CLASS };
export const BASEMAP_LAYER_TYPE: IDescribeTsType = { value: 'BasemapLayer', type: PropertiesTypes.ARRAY };
export const RASTER_UNIQUENESS_TYPE: IDescribeTsType = { value: 'RasterUniqueness', type: PropertiesTypes.CLASS };
export const EXTERNAL_LAYER_DETAILS_TYPE: IDescribeTsType = { value: 'ExternalLayerDetails', type: PropertiesTypes.CLASS };

/**
 * References mc-models' own class-decorator-registered `LayerRasterRecord` (the raster layer entity) -
 * a plain same-file CLASS reference, not an external one, since `code-generator` already emits it from
 * the decorator side of `getGraphQLClassMapping()`.
 */
export const LAYER_RASTER_RECORD_TYPE: IDescribeTsType = { value: 'LayerRasterRecord', type: PropertiesTypes.CLASS };

/**
 * `capabilities` is confirmed type-only (sourced from `@map-colonies/wmts-client`'s `CapabilityWMTS`),
 * never zod-validated - so mc-models has no business modeling its internal shape. Instead this tells
 * `code-generator` to reference `catalog-web-app-bff`'s own already-hand-maintained `CapabilityType`
 * (src/graphql/capability.ts) directly, rather than generating a nested class for it.
 */
export const CAPABILITY_TYPE: IDescribeTsType = {
  value: 'CapabilityType',
  type: PropertiesTypes.CLASS,
  importFromPackage: '../graphql/capability',
};

/**
 * The flat merge of `BasemapLayerSourceInputSchema`'s two branches (see `basemapLayerSourceModel.ts`) -
 * GraphQL has no input-type union, and this already matches `catalog-web-app-bff`'s existing
 * hand-written `BasemapLayerSourceInput`. Used both directly (nowhere else needs it) and as the
 * `inputType` of `BASEMAP_LAYER_SOURCE_UNION_TYPE` below.
 */
export const BASEMAP_LAYER_SOURCE_TYPE: IDescribeTsType = { value: 'BasemapLayerSource', type: PropertiesTypes.CLASS };

/**
 * The real output-side union of `CatalogResourceSource`/`ExternalLayerSource` (see
 * `catalogResourceSourceModel.ts`/`externalLayerSourceModel.ts`), discriminated by `type` - matching
 * `catalog-web-app-bff`'s existing hand-written `BasemapLayerSourceUnion` (`createUnionType`).
 * On the InputType side this field falls back to `BASEMAP_LAYER_SOURCE_TYPE`'s flat merge instead,
 * since GraphQL itself has no input unions.
 */
export const BASEMAP_LAYER_SOURCE_UNION_TYPE: IDescribeTsType = {
  value: 'BasemapLayerSource',
  type: PropertiesTypes.UNION,
  discriminant: 'type',
  branches: [
    { className: 'CatalogResourceSource', discriminantValue: 'CATALOG_RESOURCE' },
    { className: 'ExternalLayerSource', discriminantValue: 'EXTERNAL' },
  ],
  inputType: BASEMAP_LAYER_SOURCE_TYPE,
};
