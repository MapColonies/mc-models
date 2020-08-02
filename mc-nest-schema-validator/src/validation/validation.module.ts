import { Module, Global, Inject } from '@nestjs/common';
import { ValidationInterceptor } from './ValidationInterceptor';
import { SchemaValidator } from '@map-colonies/mc-schema-validator';
import { SchemaValidatorConstraint } from './SchemaValidatorConstraint';
import { Config, Logger } from '../config';

@Global()
@Module({
  providers: [
    {
      provide: SchemaValidator,
      useValue: SchemaValidator.getInstance()
    },
    ValidationInterceptor,
    SchemaValidatorConstraint
  ],
  exports: [ValidationInterceptor, SchemaValidator, SchemaValidatorConstraint]
})
export class ValidationModule {
  public constructor(@Inject('Logger') logger: Logger) {
    Config.logger = logger;
  }
}
