import { LayerMetadata, ProductType, Transparency } from '../../layerMetadata';
import { PolygonPartRecord } from '../../polygonParts';

export type IUpdateRasterLayerMetadata = Pick<LayerMetadata, 'productSubType' | 'description' | 'region' | 'classification' | 'scale'>;

export class UpdateRasterLayerMetadata implements IUpdateRasterLayerMetadata {
  public productSubType: string | undefined;
  public description: string | undefined;
  public region: string[] | undefined;
  public classification: string | undefined;
  public scale: number | undefined;

  public constructor(productSubType?: string, description?: string, region?: string[], classification?: string, scale?: number) {
    this.productSubType = productSubType;
    this.description = description;
    this.region = region;
    this.classification = classification;
    this.scale = scale;
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

  public constructor(
    productId?: string,
    producerName?: string,
    productType?: ProductType,
    srs?: string,
    srsName?: string,
    transparency?: Transparency,
    productName?: string,
    productSubType?: string,
    description?: string,
    region?: string[],
    classification?: string,
    scale?: number
  ) {
    super(productSubType, description, region, classification, scale);
    this.productId = productId;
    this.producerName = producerName;
    this.productType = productType;
    this.srs = srs;
    this.srsName = srsName;
    this.transparency = transparency;
    this.productName = productName;
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
