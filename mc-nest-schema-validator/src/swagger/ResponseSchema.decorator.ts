import { ApiResponse } from '@nestjs/swagger';
import { config } from '../config';

export function ResponseSchema(schemaUrl: string): MethodDecorator {
  if (!schemaUrl.match(/^http(s)?:\/\/.*/))
    schemaUrl = schemaUrl.startsWith('/')
      ? config.schemaSourceRoot + schemaUrl
      : config.schemaSourceRoot + '/' + schemaUrl;
  return ApiResponse({
    schema: {
      allOf: [
        {
          $ref: schemaUrl,
        },
      ],
    },
  });
}
