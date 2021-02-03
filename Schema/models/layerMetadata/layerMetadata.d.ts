import { GeoJSON } from "geojson";

export enum SensorType {
  "VIS",
  "RGB",
  "Pan_Sharpen",
  "OTHER",
}

export interface LayerMetadata {
  /**
   * Layer's unique identifier
   */
  source?: string;
  /**
   * Layer's source name
   */
  sourceName?: string;
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
   * List of URIs for the layer files
   */
  fileUris?: string[];
  /**
   * General geometry
   */
  geometry?: GeoJSON;
}
