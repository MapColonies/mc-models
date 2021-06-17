import { getFieldConfig, IPropFieldConfigInfo } from './fieldConfig.decorator';

type KeyValueDict = Record<string, unknown>;
const target: IFieldConfigClassInfo[] = [];

function getFieldConfigs(object: KeyValueDict): IPropFieldConfigInfo[] {
  const ret = [];
  for (const prop in object) {
    const fieldConfigMap = getFieldConfig(object, prop);
    if (fieldConfigMap) {
      ret.push({
        prop: prop,
        ...fieldConfigMap,
      });
    }
  }
  return ret;
}

function getFieldConfigClassesInfo(): IFieldConfigClassInfo[] {
  return target;
}

export interface IFieldConfigClassInfo {
  name: string;
  fields: IPropFieldConfigInfo[];
}

export function fieldConfigClass(): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <TFunction extends Function>(classCtr: TFunction): TFunction => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    const classInstance = new (classCtr as any)();
    const classData: IFieldConfigClassInfo = {
      fields: getFieldConfigs(classInstance),
      name: classCtr.name,
    };

    const classDataList = getFieldConfigClassesInfo();
    classDataList.push(classData);
    target.concat(classDataList);
    return classCtr;
  };
}

export function getFieldConfigClassInfo(className: string): IFieldConfigClassInfo {
  return target.find((classInfo) => classInfo.name === className) as IFieldConfigClassInfo;
}
