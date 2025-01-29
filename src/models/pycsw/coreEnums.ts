/* eslint-disable  @typescript-eslint/prefer-literal-enum-member, @typescript-eslint/no-magic-numbers */
import { DataType } from '@map-colonies/mc-utils';

export { RecordType } from '@map-colonies/types';

export enum Units {
  METER = 'METER',
  DD = 'DD',
  DMS = 'DMS',
  ARC_SECONDS = 'ARC_SECONDS',
  UNKNOWN = 'UNKNOWN',
}

export enum UndulationModel {
  MSL_EGM96 = 'MSL EGM96',
  MSL_EGM2008 = 'MSL EGM2008',
  MSL_DMA10 = 'MSL DMA10',
  ILUM = 'ILUM',
}

export enum DEMDataType {
  INT16 = DataType.INT16,
  FLOAT32 = DataType.FLOAT32,
  FLOAT64 = DataType.FLOAT64,
}

export enum NoDataValue {
  NO_DATA_32768 = '-32768',
  NO_DATA_32767 = '-32767',
  NO_DATA_999 = '-999',
}
