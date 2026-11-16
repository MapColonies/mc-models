import { areaOrPoint, demDataType, verticalType } from './constants';

// TODO: import directly from dem-shared and remove this file
export type AreaOrPoint = (typeof areaOrPoint)[number];
export type DEMDataType = (typeof demDataType)[number];
export type VerticalType = (typeof verticalType)[number];
