import { ApiBody } from '@nestjs/swagger';
import { Config } from '../config';

export function BodySchema(schemaUrl: string): MethodDecorator {
  const httpRegex = /^http(s)?:\/\/.*/;
  if (!httpRegex.exec(schemaUrl)) {
    schemaUrl = schemaUrl.startsWith('/')
      ? Config.schemaSourceRoot + schemaUrl
      : Config.schemaSourceRoot + '/' + schemaUrl;
  }

  return ApiBody({
    schema: {
      allOf: [
        {
          $ref: schemaUrl
        }
      ]
    }
  });
}
