import { z } from 'zod';
import { IDescribeTsType, PropertiesTypes, TsTypes } from '../../layerMetadata';

function unwrap(schema: z.ZodTypeAny): z.ZodTypeAny {
  let current = schema;
  while (current instanceof z.ZodOptional || current instanceof z.ZodNullable || current instanceof z.ZodDefault || current instanceof z.ZodEffects) {
    current = current instanceof z.ZodEffects ? (current._def.schema as z.ZodTypeAny) : (current._def.innerType as z.ZodTypeAny);
  }
  return current;
}

/**
 * Infers an `IDescribeTsType` mapping directly from a zod schema node, for the cases where the
 * zod type alone is unambiguous (primitives, and arrays of primitives).
 * Returns `undefined` for anything that needs an explicit `tsType` annotation to be generated
 * correctly (enums, nested objects/classes and arrays of those), mirroring the behaviour of the
 * class-based `getGraphQLMappings`, which skips fields with no resolvable ts-type mapping.
 */
export function inferZodTsType(schema: z.ZodTypeAny): IDescribeTsType | undefined {
  const unwrapped = unwrap(schema);

  if (unwrapped instanceof z.ZodString) {
    return TsTypes.STRING;
  }
  if (unwrapped instanceof z.ZodNumber) {
    return TsTypes.NUMBER;
  }
  if (unwrapped instanceof z.ZodBoolean) {
    return TsTypes.BOOLEAN;
  }
  if (unwrapped instanceof z.ZodDate) {
    return TsTypes.DATE;
  }
  if (unwrapped instanceof z.ZodArray) {
    const elementType = unwrap(unwrapped._def.type as z.ZodTypeAny);
    if (elementType instanceof z.ZodString) {
      return TsTypes.STRING_ARRAY;
    }
    return undefined;
  }
  if (unwrapped instanceof z.ZodObject) {
    return { value: 'Record<string, unknown>', type: PropertiesTypes.OBJECT };
  }

  return undefined;
}
