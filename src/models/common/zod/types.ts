import { z } from 'zod';
import { IDescribeTsType } from '../../layerMetadata';
import { IFieldConfigInfo } from '../decorators/fieldConfig/fieldConfig.decorator';
import { IGraphQLMapping } from '../decorators/graphQL/graphql.decorator';

/**
 * Per-field metadata attached to a key of a zod object shape.
 * Mirrors the `@fieldConfig`/`@graphql`/`@tsTypes` property decorators used on class-based models,
 * since those decorators cannot be applied to a zod shape's properties.
 */
export interface IZodFieldAnnotation {
  fieldConfig?: IFieldConfigInfo;
  graphql?: IGraphQLMapping;
  /**
   * Overrides the ts-type mapping used for GraphQL generation.
   * Required for fields whose type cannot be inferred from the zod schema alone
   * (enums, nested object/class references, arrays of those, etc. - see `inferZodTsType`).
   */
  tsType?: IDescribeTsType;
}

export type ZodFieldAnnotations<Shape extends z.ZodRawShape> = Partial<Record<keyof Shape, IZodFieldAnnotation>>;
