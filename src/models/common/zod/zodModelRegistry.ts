import type { IFieldConfigClassInfo } from '../decorators/fieldConfig/classFieldConfig.decorator';
import type { IGraphQLClassMapping } from '../decorators/graphQL/classGraphql.decorator';
import type { AnnotatedZodObject } from './extendedZodObject';

/**
 * Bridge between `AnnotatedZodObject` models and the class-decorator-based registries that
 * `@fieldConfigClass()`/`@graphqlClass()` populate. Consumers (`code-generator`) keep calling
 * `getFieldConfigClassInfo()`/`getGraphQLClassMapping()` exactly as before - those two functions
 * read this registry internally - so they never need to know whether a given model is backed by a
 * decorated class or by a zod schema.
 *
 * Only type-only imports flow from here back to the two decorator files, so this never introduces
 * a runtime circular dependency even though they import functions from this module.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registeredZodModels: AnnotatedZodObject<any>[] = [];

/**
 * Registers an `AnnotatedZodObject`, the zod-schema equivalent of applying `@fieldConfigClass()`/
 * `@graphqlClass()` to a decorated class. Call this once per model, at module scope - mirroring
 * class decorators running at class declaration time.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerAnnotatedZodObject<T extends AnnotatedZodObject<any>>(model: T): T {
  registeredZodModels.push(model);
  return model;
}

/**
 * Looks up and computes a single registered model's field configs, rather than every registered
 * model's - a field's `complexType` resolution (see `AnnotatedZodObject#getFieldConfigs`) calls back
 * into `getFieldConfigClassInfo()`, which calls this; computing every model eagerly here would recurse
 * back into the very model whose `getFieldConfigs()` call is still on the stack.
 */
export function getZodFieldConfigClassInfo(className: string): IFieldConfigClassInfo | undefined {
  const model = registeredZodModels.find((candidate) => candidate.name === className);
  return model ? { name: model.name, fields: model.getFieldConfigs() } : undefined;
}

export function getZodGraphQLClassMappings(): IGraphQLClassMapping[] {
  return registeredZodModels.map((model) => ({
    name: model.name,
    fields: model.getGraphQLMappings(),
    skipInputType: model.skipInputType,
    skipObjectType: model.skipObjectType,
  }));
}
