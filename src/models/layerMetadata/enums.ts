export enum SensorType {
  VIS = 'VIS',
  RGB = 'RGB',
  // eslint-disable-next-line
  Pan_Sharpen = 'Pan_Sharpen',
  OTHER = 'OTHER',
  UNDEFINED = 'UNDEFINED',
}

export enum ProductType {
  ORTHOPHOTO = 'Orthophoto',
  ORTHOPHOTO_HISTORY = 'OrthophotoHistory',
  ORTHOPHOTO_BEST = 'OrthophotoBest',
  RASTER_MAP = 'RasterMap',
  RASTER_MAP_BEST = 'RasterMapBest',
  RASTER_AID = 'RasterAid',
  RASTER_AID_BEST = 'RasterAidBest',
  RASTER_VECTOR = 'RasterVector',
  RASTER_VECTOR_BEST = 'RasterVectorBest',
  VECTOR_BEST = 'VectorBest',
  DTM = 'DTM',
  DSM = 'DSM',
  QUANTIZED_MESH = 'QuantizedMesh',
  PHOTO_REALISTIC_3D = '3DPhotoRealistic',
}
