import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SchemaValidator, ValidationStatus } from 'mc-schema-validator';
import { BadRequestException, Injectable } from '@nestjs/common';
import Ajv from 'ajv';

@ValidatorConstraint({ async: true })
@Injectable()
export class SchemaValidatorConstraint implements ValidatorConstraintInterface {
  private errors?: Ajv.ErrorObject[];

  async validate(
    value: unknown,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const res = await SchemaValidator.getInstance().validate(
      validationArguments.constraints[0],
      value
    );
    this.errors = res.errors;
    return res.status == ValidationStatus.valid;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new BadRequestException(this.errors);
  }
}
