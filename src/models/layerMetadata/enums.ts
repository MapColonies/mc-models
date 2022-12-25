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
  QUANTIZED_MESH_DTM = 'QuantizedMeshDTM',
  QUANTIZED_MESH_DSM = 'QuantizedMeshDSM',
  QUANTIZED_MESH_DTM_BEST = 'QuantizedMeshDTMBest',
  QUANTIZED_MESH_DSM_BEST = 'QuantizedMeshDSMBest',
  PHOTO_REALISTIC_3D = '3DPhotoRealistic',
  POINT_CLOUD = 'PointCloud',
}

export enum RecordStatus {
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

export enum TileOutputFormat {
  PNG = 'PNG',
  JPEG = 'JPEG',
}

export enum Transparency {
  TRANSPARENT = 'TRANSPARENT',
  OPAQUE = 'OPAQUE',
}
