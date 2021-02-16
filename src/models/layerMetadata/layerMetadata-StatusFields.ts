import { LayerMetadata } from './layerMetadata';

export class StatusMetadata extends LayerMetadata {
  /**
   * Layer creation time
   */
  public ingestionStartDate?: Date;
  /**
   * Layer creation time
   */
  public ingestionEndDate?: Date;
  /**
   * Location of tiles"
   */
  public layerTileLocation?: string;
}
