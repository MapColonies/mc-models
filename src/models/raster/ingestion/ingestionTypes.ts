import { LayerMetadata, ProductType, Transparency } from '../../layerMetadata';
import { PolygonPartRecord } from '../../polygonParts';

export type IBaseRasterLayerMetadata = Pick<LayerMetadata, 'classification'>;

export class BaseRasterLayerMetadata implements IBaseRasterLayerMetadata {
  public classification: string;

  public constructor(classification: string) {
    this.classification = classification;
  }
}
export class UpdateRasterLayerMetadata extends BaseRasterLayerMetadata {
  constructor(classification: string) {
    super(classification);
  }
}

export type INewRasterLayerMetadata = BaseRasterLayerMetadata &
  Pick<LayerMetadata, 'productId' | 'productType' | 'srs' | 'srsName' | 'transparency' | 'productName'> &
  Partial<Pick<LayerMetadata, 'producerName' | 'description'>>;

export class NewRasterLayerMetadata extends BaseRasterLayerMetadata implements INewRasterLayerMetadata {
  public productId: string;
  public productType: ProductType;
  public srs: string;
  public srsName: string;
  public transparency: Transparency;
  public productName: string;
  public region: string[];
  public productSubType?: string;
  public scale?: number;
  public producerName?: string;
  public description?: string;

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
    super(classification);
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
    this.description = description;
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
