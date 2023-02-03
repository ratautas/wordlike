import { DEVICE_DEFAULTS } from '$lib/constants';
import type { GridElementType, DeviceKeyType } from '$lib/schema';

export type GetTemplateColumnsParams = {
    elementData: GridElementType
    gridTemplateColumns: number[]
    deviceKey: DeviceKeyType
};

export function getTemplateColumns({ elementData, gridTemplateColumns, deviceKey }: GetTemplateColumnsParams) {
    const paddingX = elementData[deviceKey]?.paddingX ?? DEVICE_DEFAULTS[deviceKey].paddingX;
    const width = elementData[deviceKey]?.width ?? DEVICE_DEFAULTS[deviceKey].width;

    return [
        `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`,
        ...gridTemplateColumns,
        `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`
    ]
        .map((col) => {
            if (isNaN(Number(col))) return col;
            return `${Math.round(col as number / width * 1000)}fr`;
        })
        .join(' ');
};