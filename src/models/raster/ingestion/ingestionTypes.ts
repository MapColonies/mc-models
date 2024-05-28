import { LayerMetadata, ProductType, Transparency } from '../../layerMetadata';
import { PolygonPartRecord } from '../../polygonParts';

export type IUpdateRasterLayerMetadata = Pick<LayerMetadata, 'classification'> & Partial<Pick<LayerMetadata, 'description'>>;

export class UpdateRasterLayerMetadata implements IUpdateRasterLayerMetadata {
  public description?: string | undefined;
  public classification: string | undefined;

  public constructor(classification: string, description?: string) {
    this.description = description;
    this.classification = classification;
  }
}

export type INewRasterLayerMetadata = UpdateRasterLayerMetadata &
  Pick<LayerMetadata, 'productId' | 'productType' | 'srs' | 'srsName' | 'transparency' | 'productName'> &
  Partial<Pick<LayerMetadata, 'producerName'>>;

export class NewRasterLayerMetadata extends UpdateRasterLayerMetadata implements INewRasterLayerMetadata {
  public productId: string | undefined;
  public productType: ProductType | undefined;
  public srs: string | undefined;
  public srsName: string | undefined;
  public transparency: Transparency | undefined;
  public productName: string | undefined;
  public region: string[] | undefined;
  public productSubType?: string | undefined;
  public scale?: number | undefined;
  public producerName?: string | undefined;

  public constructor(
    productId: string,
    productType: ProductType,
    srs: string,
    srsName: string,
    transparency: Transparency,
    productName: string,
    region: string[],
    classification: string,
    productSubType?: string,
    description?: string,
    scale?: number,
    producerName?: string
  ) {
    super(classification, description);
    this.productId = productId;
    this.producerName = producerName;
    this.productType = productType;
    this.srs = srs;
    this.srsName = srsName;
    this.transparency = transparency;
    this.productName = productName;
    this.scale = scale;
    this.productSubType = productSubType;
    this.region = region;
  }
}

export type PolygonPart = Pick<
  PolygonPartRecord,
  | 'name'
  | 'resolutionDegree'
  | 'resolutionMeter'
  | 'sourceResolutionMeter'
  | 'horizontalAccuracyCE90'
  | 'sensors'
  | 'imagingTimeBeginUTC'
  | 'imagingTimeEndUTC'
  | 'geometry'
> &
  Partial<Pick<PolygonPartRecord, 'id' | 'description' | 'countries' | 'cities'>>;

export interface InputFiles {
  originDirectory: string;
  fileNames: string[];
}

export interface RasterIngestionLayer {
  metadata: NewRasterLayerMetadata | UpdateRasterLayerMetadata;
  partData: PolygonPart[];
  inputFiles: InputFiles;
}
