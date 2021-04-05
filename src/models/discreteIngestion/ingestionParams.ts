import { LayerMetadata } from '../layerMetadata';

export interface IngestionParams {
  /**
   * List of the layer files
   */
  fileNames: string[];

  /**
   * layer directory relative to mount
   */
  originDirectory: string;
  /**
   * layer metadata
   */
  metadata: LayerMetadata;
}
