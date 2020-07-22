import { ApiBody } from '@nestjs/swagger';
import { config } from '../config';

export function BodySchema(schemaUrl: string): MethodDecorator {
  if (!schemaUrl.match(/^http(s)?:\/\/.*/))
    schemaUrl = schemaUrl.startsWith('/')
      ? config.schemaSourceRoot + schemaUrl
      : config.schemaSourceRoot + '/' + schemaUrl;

  return ApiBody({
    schema: {
      allOf: [
        {
          $ref: schemaUrl,
        },
      ],
    },
  });
}
