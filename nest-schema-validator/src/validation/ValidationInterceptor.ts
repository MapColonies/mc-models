import {
  ExecutionContext,
  BadRequestException,
  InternalServerErrorException,
  Injectable,
  NestInterceptor,
  CallHandler
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SchemaValidator, ValidationStatus } from '@map-colonies/mc-schema-validator';
import { Observable } from 'rxjs';
import { ISchemaOptions } from './ISchemaOptions';
import { Config } from '../config';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly validator: SchemaValidator
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    let validationErrors: unknown;
    try {
      const schemaOpt = this.reflector.get<string | ISchemaOptions>(
        'ValidatorSchema',
        context.getHandler()
      );
      let schema: string;
      const req = context.switchToHttp().getRequest();
      const data = req.body;
      if (typeof schemaOpt === 'string') schema = schemaOpt;
      else {
        schema = schemaOpt.schema;
        if (schemaOpt.serializeProperties) {
          Object.keys(data)
            .filter((key) => {
              return (
                (!schemaOpt.serializeProperties.only ||
                  schemaOpt.serializeProperties.only.includes(key)) &&
                (!schemaOpt.serializeProperties.skip ||
                  !schemaOpt.serializeProperties.skip.includes(key))
              );
            })
            .forEach((key) => {
              try {
                data[key] = JSON.parse(data[key]);
              } catch (err) {
                Config.logger.log('info', `invalid json: ${err.message}`);
                validationErrors = err;
              }
            });
        }
      }
      if (!validationErrors) {
        const res = await this.validator.validate(schema, data);
        if (res.status == ValidationStatus.valid) return next.handle();
        else if (res.status == ValidationStatus.missingValidator) {
 Config.logger.log(
            'warn',
            `no validator was registered for: ${schema}`
          );
        }
        validationErrors = res.errors;
      }
    } catch (err) {
      Config.logger.log('error', `validation schema error: ${err}`);
      throw new InternalServerErrorException();
    }
    throw new BadRequestException(validationErrors);
  }
}
