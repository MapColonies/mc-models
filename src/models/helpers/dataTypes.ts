import { DataType, RecordType } from '../pycsw/coreEnums';

type ValueOf<T> = T[keyof T];

export const DATA_TYPES_MAP: Map<Partial<RecordType>, ValueOf<DataType>[]> = new Map([
  [RecordType.RECORD_DEM, [DataType.INT16, DataType.FLOAT32, DataType.FLOAT64]],
  [
    RecordType.RECORD_ALL,
    [
      DataType.BYTE,
      DataType.INT8,
      DataType.UINT16,
      DataType.INT16,
      DataType.UINT32,
      DataType.INT32,
      DataType.UINT64,
      DataType.INT64,
      DataType.FLOAT32,
      DataType.FLOAT64,
      DataType.CINT16,
      DataType.CINT32,
      DataType.CFLOAT32,
      DataType.CFLOAT64,
    ],
  ],
]);

/**
 * Returns a list of data types lower in value than the provided type in order to prevent interpolations for gdal operations.
 * @param {DataType} currentType The current data type to build the list upon.
 * @param {RecordType} [domain = RecordType.RECORD_ALL] domain The requested domain for the original valid data types list.
 * @returns DataType[]
 */
export const getDataTypesNoInterpolation = (currentType: DataType, domain: RecordType = RecordType.RECORD_ALL): DataType[] => {
  const dataTypeForDomain = DATA_TYPES_MAP.get(domain) as DataType[];

  const currentTypeIdx = dataTypeForDomain.findIndex((type) => type === currentType);
  return dataTypeForDomain.slice(0, currentTypeIdx + 1);
};
