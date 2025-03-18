import { GeoJSON } from 'geojson';
import { ProductType, RecordType } from '@map-colonies/types';

export interface IMetadataCommonModel {
  // PROFILES COMMON FIELDS
  type: RecordType | undefined;
  classification: string | undefined;
  productName: string | undefined;
  description: string | undefined;
  srsName: string | undefined;
  producerName: string | undefined;
  sensors: string[] | undefined;
  region: string[] | undefined;
  footprint: GeoJSON | undefined;
  productId: string | undefined;
  productType: ProductType | undefined;
}
