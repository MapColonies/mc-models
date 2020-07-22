import { Module, Global, Inject } from '@nestjs/common';
import { ValidationInterceptor } from './ValidationInterceptor';
import { SchemaValidator } from 'mc-schema-validator';
import { SchemaValidatorConstraint } from './SchemaValidatorConstraint';
import { config } from '../config';

@Global()
@Module({
  providers: [
    {
      provide: SchemaValidator,
      useValue: SchemaValidator.getInstance(),
    },
    ValidationInterceptor,
    SchemaValidatorConstraint,
  ],
  exports: [ValidationInterceptor, SchemaValidator, SchemaValidatorConstraint],
})
export class ValidationModule {
  constructor(@Inject('Logger') logger) {
    config.logger = logger;
  }
}
