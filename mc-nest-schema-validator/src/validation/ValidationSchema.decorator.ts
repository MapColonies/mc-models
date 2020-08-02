import { SetMetadata, applyDecorators, UseInterceptors } from '@nestjs/common';
import { ValidationInterceptor } from './ValidationInterceptor';
import { ISchemaOptions } from './ISchemaOptions';
import { BodySchema } from '../swagger/BodySchema.decorator';
import { Config } from '../config';

export function ValidationSchema(schemaOpt: string | ISchemaOptions) : ClassDecorator | MethodDecorator | PropertyDecorator {
  let schemaUrl = typeof schemaOpt === 'string' ? schemaOpt : schemaOpt.schema;
  schemaUrl = schemaUrl.startsWith('/')
    ? Config.schemaSourceRoot + schemaUrl
    : Config.schemaSourceRoot + '/' + schemaUrl;
  if (typeof schemaOpt !== 'string') schemaOpt.schema = schemaUrl;
  const decorators: (MethodDecorator | ClassDecorator | PropertyDecorator)[] = [
    BodySchema(schemaUrl),
    SetMetadata('ValidatorSchema', schemaOpt)
  ];
  if (
    typeof schemaOpt === 'string' ||
    schemaOpt.registerInterceptor == null ||
    schemaOpt.registerInterceptor
  ) {
    decorators.push(UseInterceptors(ValidationInterceptor));
  }
  return applyDecorators(...decorators);
}
