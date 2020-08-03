import { ApiResponse } from '@nestjs/swagger';
import { Config } from '../config';

export function ResponseSchema(schemaUrl: string): MethodDecorator {
  const httpRegex = /^http(s)?:\/\/.*/;
  if (!httpRegex.exec(schemaUrl)) {
    schemaUrl = schemaUrl.startsWith('/')
      ? Config.schemaSourceRoot + schemaUrl
      : Config.schemaSourceRoot + '/' + schemaUrl;
  }
  return ApiResponse({
    schema: {
      allOf: [
        {
          $ref: schemaUrl
        }
      ]
    }
  });
}
