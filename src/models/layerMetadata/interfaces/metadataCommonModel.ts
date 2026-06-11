import { GeoJSON } from 'geojson';
import { ProductType, RecordType } from '@map-colonies/types';
import { ThreeDProductType } from '../../3dCatalog/constants';

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
  productType: ProductType | ThreeDProductType | undefined;
}
