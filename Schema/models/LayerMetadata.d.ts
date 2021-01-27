import { GeoJSON } from "geojson";

export enum SensorType {
  "VIS",
  "RGB",
  "Pan_Sharpen",
}

export interface LayerMetadata {
  /**
   * Layer's unique identifier
   */
  source?: string;
  /**
   * Layer creation time
   */
  updateDate?: Date;
  /**
   * Layer resolution
   */
  resolution?: number;
  /**
   * accuracy
   */
  ep90?: number;
  /**
   * Layer sensor type
   */
  sensorType?: SensorType;
  rms?: number;
  /**
   * Scale of layer
   */
  scale?: string;
  /**
   * Layer description
   */
  dsc?: string;
  /**
   * List of URIs for the layer tiles
   */
  tileUris?: string[];
  /**
   * General geometry
   */
  geometry?: GeoJSON;
}
