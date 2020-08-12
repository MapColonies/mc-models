export interface ISchemaOptions {
  schema: string;
  serializeProperties?: {
    only?: string[];
    skip?: string[];
  };
  registerInterceptor?: boolean;
}
