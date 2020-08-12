import { has, get } from 'config';

export type Logger = {
  log: (level: string, message: string) => void;
};

export class Config {
  public static schemaSourceRoot: string = Config.getSourceRoot();

  public static logger: Logger;

  private static getSourceRoot(): string {
    if (has('validation.schemaSourceRoot'))
    {
      let root = get<string>('validation.schemaSourceRoot');
      if(root.endsWith('/')){
        root = root.substr(0,root.length-1);
      }
      return root;
    }
    return '';
  }
}
