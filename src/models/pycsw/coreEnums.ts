/* eslint-disable  @typescript-eslint/prefer-literal-enum-member, @typescript-eslint/no-magic-numbers */
export enum RecordType {
  RECORD_RASTER = 'RECORD_RASTER',
  RECORD_3D = 'RECORD_3D',
  RECORD_DEM = 'RECORD_DEM',
  RECORD_ALL = 'RECORD_ALL',
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
  BYTE = 'Byte',
  INT8 = 'Int8',
  UINT16 = 'UInt16',
  INT16 = 'Int16',
  UINT32 = 'UInt32',
  INT32 = 'Int32',
  UINT64 = 'UInt64',
  INT64 = 'Int64',
  FLOAT32 = 'Float32',
  FLOAT64 = 'Float64',
  CINT16 = 'CInt16',
  CINT32 = 'CInt32',
  CFLOAT32 = 'CFloat32',
  CFLOAT64 = 'CFloat64',
}

export enum DEMDataType {
  INT16 = DataType.INT16,
  FLOAT32 = DataType.FLOAT32,
  FLOAT64 = DataType.FLOAT64,
}

export enum NoDataValue {
  NO_DATA_32768 = -32768,
  NO_DATA_32767 = -32767,
  NO_DATA_999 = -999,
}
