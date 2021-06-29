import { GeoJSON } from 'geojson';
import { SensorType } from '../enums';
import { RecordType } from '../../pycsw/coreEnums';

export interface IMetadataCommonModel {
  // PROFILES COMMON FIELDS
  type: RecordType | undefined;
  classification: string | undefined;
  productName: string | undefined; //title
  description: string | undefined;
  srsId: string | undefined;
  producerName: string | undefined; //not in spec but present in profile (probably 3D only)
  creationDate: Date | undefined;
  ingestionDate: Date | undefined;
  updateDate: Date | undefined;
  sourceDateStart: Date | undefined;
  sourceDateEnd: Date | undefined;
  accuracyCE90: number | undefined;
  sensorType: SensorType[] | undefined; //sensors
  region: string | undefined;
  footprint: GeoJSON | undefined;
}
