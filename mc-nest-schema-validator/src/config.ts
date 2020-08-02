import { has, get } from 'config';

export type Logger = {
  log: (level: string, message: string) => void;
}
export class Config {
  public static schemaSourceRoot: string = has('validation.schemaSourceRoot')
    ? get<string>('validation.schemaSourceRoot')
    : '';

  public static logger: Logger;
}
