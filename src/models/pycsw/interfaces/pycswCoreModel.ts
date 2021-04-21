import { Link } from '../../common/interfaces/link.interface';

export interface IPycswCoreModel {
  typeName?: string;
  schema?: string;
  mdSource?: string;
  xml?: string;
  anyText?: string;
  insertDate?: Date;
  wktGeometry?: string;
  links?: Link[];
  anyTextTsvector?: string;
  description?: string;
  wkbGeometry?: string;
  identifier?: string;
  title?: string;
  type?: string;
  srs?: string;
  producerName?: string;
  projectName?: string;
  creationDate?: Date;
  classification?: string;
  keywords?: string;
}
