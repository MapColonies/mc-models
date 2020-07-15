import Ajv from "ajv";
import * as axios from "axios";

type vaildatorRecord = {
   validate?: PromiseLike<Ajv.ValidateFunction | void>;
   error?: Error;
   schema: string;
};

export enum ValidationStatus {
   valid,
   invalid,
   missingValidator,
}

export type ValidationResult = {
   status: ValidationStatus;
   errors?: Ajv.ErrorObject[] | null;
};

export class SchemaValidator {
   private static instance: SchemaValidator;

   static getInstance(): SchemaValidator {
      if (!this.instance) this.instance = new SchemaValidator();
      return this.instance;
   }

   private ajv: Ajv.Ajv;
   private validators: { [key: string]: vaildatorRecord } = {};

   constructor(private tryLoadMissingSchema = true) {
      this.ajv = new Ajv({
         loadSchema: this.loadSchema,
         extendRefs: true,
      });
   }

   private async loadSchema(uri: string): Promise<object> {
      try {
         const res = await axios.default.get(uri);
         return res.data;
      } catch (error) {
         throw new Error(`invalid validation schema url: ${uri}`);
      }
   }

   private async getValidator(schemaUrl: string) {
      if (!this.validators[schemaUrl] && this.tryLoadMissingSchema) await this.LoadVaidator(schemaUrl);
      if (this.validators[schemaUrl]) {
         const validate = await this.validators[schemaUrl].validate;
         if (!this.validators[schemaUrl].error) return validate;
         else throw this.validators[schemaUrl].error;
      }
      return null;
   }

   async LoadVaidator(schemaUrl: string): Promise<void> {
      if (!this.validators[schemaUrl]) {
         this.validators[schemaUrl] = {
            schema: schemaUrl,
         };
      }
      try {
         const schema = await this.loadSchema(schemaUrl);
         this.validators[schemaUrl].validate = this.ajv.compileAsync(schema).then(
            (validator: Ajv.ValidateFunction) => validator,
            (err: Error) => {
               this.validators[schemaUrl].error = err;
            }
         );
      } catch (error) {
         this.validators[schemaUrl].error = error;
      }
   }

   async validate(schemaUrl: string, data: unknown): Promise<ValidationResult> {
      const validate = await this.getValidator(schemaUrl);
      if (!validate) return { status: ValidationStatus.missingValidator };
      if (await validate(data)) return { status: ValidationStatus.valid };
      return {
         status: ValidationStatus.invalid,
         errors: validate.errors,
      };
   }
}
