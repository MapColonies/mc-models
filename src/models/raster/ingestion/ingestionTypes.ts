import { LayerMetadata, ProductType, Transparency } from '../../layerMetadata';
import { PolygonPartRecord } from '../../polygonParts';

export type IUpdateRasterLayerMetadata = Pick<LayerMetadata, 'productSubType' | 'description' | 'region' | 'classification' | 'scale'>;

export class UpdateRasterLayerMetadata implements IUpdateRasterLayerMetadata {
  public productSubType: string | undefined;
  public description: string | undefined;
  public region: string[] | undefined;
  public classification: string | undefined;
  public scale: number | undefined;

  public constructor() {
    this.productSubType = undefined;
    this.description = undefined;
    this.region = undefined;
    this.classification = undefined;
    this.scale = undefined;
  }
}

export type INewRasterLayerMetadata = UpdateRasterLayerMetadata &
  Pick<LayerMetadata, 'productId' | 'producerName' | 'productType' | 'srs' | 'srsName' | 'transparency' | 'productName'>;

export class NewRasterLayerMetadata extends UpdateRasterLayerMetadata implements INewRasterLayerMetadata {
  public productId: string | undefined;
  public producerName: string | undefined;
  public productType: ProductType | undefined;
  public srs: string | undefined;
  public srsName: string | undefined;
  public transparency: Transparency | undefined;
  public productName: string | undefined;

  public constructor() {
    super();
    this.productId = undefined;
    this.producerName = undefined;
    this.productType = undefined;
    this.srs = undefined;
    this.srsName = undefined;
    this.transparency = undefined;
    this.productName = undefined;
  }
}

export type PolygonPart = Pick<
  PolygonPartRecord,
  | 'id'
  | 'name'
  | 'description'
  | 'resolutionDegree'
  | 'resolutionMeter'
  | 'sourceResolutionMeter'
  | 'horizontalAccuracyCE90'
  | 'countries'
  | 'cities'
  | 'sensors'
  | 'imagingTimeBeginUTC'
  | 'imagingTimeEndUTC'
  | 'geometry'
>;

export interface InputFiles {
  originDirectory: string;
  fileNames: string[];
}

export interface RasterIngestionLayer {
  metadata: NewRasterLayerMetadata | UpdateRasterLayerMetadata;
  partData: PolygonPart[];
  inputFiles: InputFiles;
}
