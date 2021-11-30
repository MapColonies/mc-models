export enum RecordType {
  RECORD_RASTER = 'RECORD_RASTER',
  RECORD_3D = 'RECORD_3D',
  RECORD_DEM = 'RECORD_DEM',
  RECORD_ALL = 'RECORD_ALL',
}

export enum VerticalDatum {
  WGS_1984 = 'WGS 1984',
  WGS_1972 = 'WGS 1972',
  PULKOVO_1942 = 'Pulkovo 1942',
  PALESTINE_1923 = 'Palestine 1923',
  MSL_HEIGHT = 'MSL Height',
  ISRAEL = 'Israel',
  ED_1950_IDF = 'ED 1950 IDF',
}

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

export enum DataType {
  FLOAT64 = 'FLOAT64',
  FLOAT32 = 'FLOAT32',
  FLOAT16 = 'FLOAT16',
  INT64 = 'INT64',
  INT32 = 'INT32',
  INT16 = 'INT16',
  INT8 = 'INT8',
}

export enum NoDataValue {
  NO_DATA_32768 = '-32768',
  NO_DATA_326767 = '-326767',
  NO_DATA_999 = '-999',
}
