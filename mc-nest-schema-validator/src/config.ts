import { has, get } from 'config';

type Logger = {
  log(level: string, message: string): void;
};
export class config {
  static schemaSourceRoot: string = has('validation.schemaSourceRoot')
    ? get<string>('validation.schemaSourceRoot')
    : '';
  static logger: Logger;
}
