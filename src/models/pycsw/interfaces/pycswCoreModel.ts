import { ILink } from '../../common/interfaces/ILink';

export interface IPycswCoreModel {
  typeName?: string;
  schema?: string;
  mdSource?: string;
  xml?: string;
  anyText?: string;
  insertDate?: Date;
  wktGeometry?: string;
  links?: ILink[];
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
