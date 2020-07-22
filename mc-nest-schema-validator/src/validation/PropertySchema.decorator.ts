import { registerDecorator, ValidationOptions } from 'class-validator';
import { SchemaValidatorConstraint } from './SchemaValidatorConstraint';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { config } from '../config';

export function PropertySchema(
  schemaUrl: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  if (!schemaUrl.match(/^http(s)?:\/\/.*/))
    schemaUrl = schemaUrl.startsWith('/')
      ? config.schemaSourceRoot + schemaUrl
      : config.schemaSourceRoot + '/' + schemaUrl;
  return applyDecorators(
    ApiProperty({
      allOf: [
        {
          $ref: schemaUrl,
        },
      ],
    }),
    function (object: unknown, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [schemaUrl],
        validator: SchemaValidatorConstraint,
      });
    }
  );
}
