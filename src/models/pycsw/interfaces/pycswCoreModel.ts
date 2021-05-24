import { Link } from '../../layerMetadata/link';

export interface IPycswCoreModel {
  // PYSCW CORE FIELDS
  id: string | undefined;
  typeName: string | undefined;
  schema: string | undefined;
  mdSource: string | undefined;
  xml: string | undefined;
  anyText: string | undefined;
  insertDate: Date | undefined;
  wktGeometry: string | undefined;
  wkbGeometry: string | undefined;
  keywords: string | undefined;
  anyTextTsvector: string | undefined;
  links: Link[] | undefined;
}
