import 'reflect-metadata';
import { getFieldConfig, IPropFieldConfigInfo } from './fieldConfig.decorator';

const fieldConfigMetadataKey = Symbol('fieldconfigclass');
type KeyValueDict = Record<string, unknown>;
const target = {};

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

function getFieldConfigClassesInfo(): IFieldConfigClassInfo[] | undefined {
  return Reflect.getMetadata(fieldConfigMetadataKey, target) as IFieldConfigClassInfo[];
}

export interface IFieldConfigClassInfo {
  name: string;
  fields: IPropFieldConfigInfo[];
}

export function fieldConfigClass(): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <TFunction extends Function>(classCtr: TFunction): TFunction => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const classInstance = new (classCtr as any)();
    const classData: IFieldConfigClassInfo = {
      fields: getFieldConfigs(classInstance),
      name: classCtr.name,
    };

    const classDataList = getFieldConfigClassesInfo() ?? [];
    classDataList.push(classData);
    Reflect.defineMetadata(fieldConfigMetadataKey, classDataList, target);
    return classCtr;
  };
}

export function getFieldConfigClassInfo(className: string): IFieldConfigClassInfo {
  const classInfos = Reflect.getMetadata(fieldConfigMetadataKey, target) as IFieldConfigClassInfo[];
  return classInfos.find((classInfo) => classInfo.name === className) as IFieldConfigClassInfo;
}
