import { ApiResponse } from '@nestjs/swagger';
import { Config } from '../config';

export function ResponseSchema(
  schemaUrl: string,
  status = 200
): MethodDecorator {
  const httpRegex = /^http(s)?:\/\/.*/;
  if (!httpRegex.exec(schemaUrl)) {
    schemaUrl = schemaUrl.startsWith('/')
      ? Config.schemaSourceRoot + schemaUrl
      : Config.schemaSourceRoot + '/' + schemaUrl;
  }
  return ApiResponse({
    status: status,
    schema: {
      allOf: [
        {
          $ref: schemaUrl,
        },
      ],
    },
  });
}
