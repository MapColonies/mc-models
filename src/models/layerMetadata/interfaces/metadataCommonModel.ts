import { GeoJSON } from 'geojson';
import { ProductType } from '../enums';
import { RecordType } from '../../pycsw/coreEnums';

export interface IMetadataCommonModel {
  // PROFILES COMMON FIELDS
  type: RecordType | undefined;
  classification: string | undefined;
  productName: string | undefined;
  description: string | undefined;
  srsId: string | undefined;
  srsName: string | undefined;
  producerName: string | undefined;
  updateDate: Date | undefined;
  sourceDateStart: Date | undefined;
  sourceDateEnd: Date | undefined;
  //TODO: delete
  //sensorType: SensorType[] | undefined; //sensors
  //region: string | undefined;
  footprint: GeoJSON | undefined;
  productId: string | undefined;
  productType: ProductType | undefined;
}
