import { LayerMetadata } from "./layerMetadata";

export class StatusMetadata extends LayerMetadata {
  /**
   * Layer creation time
   */
  ingestionStartDate?: Date;
  /**
   * Layer creation time
   */
  ingestionEndDate?: Date;
  /**
   * Location of tiles"
   */
  layerTileLocation?: string;
}
