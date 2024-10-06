/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z } from 'zod';
import { Polygon } from 'geojson';
import { VALIDATIONS } from '../../../constants';
import { ProductType, Transparency } from '../../../../layerMetadata/enums';

export const inputFilesSchema = z
  .object({
    originDirectory: z.string().min(1, { message: 'Origin directory is required, files should be stored on specific directory' }),
    fileNames: z
      .array(z.string().regex(new RegExp(VALIDATIONS.fileNames.pattern), 'File name must end with .gpkg'))
      .length(1, { message: 'Number of files should be 1' }),
  })
  .describe('inputFilesSchema');
