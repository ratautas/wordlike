import { DEVICE_DEFAULTS } from '$lib/constants';
import type { GridElementType, DeviceKeyType } from '$lib/schema';

export type GetTemplateColumnsParams = {
    elementData: GridElementType
    gridTemplateColumns: number[]
    device: DeviceKeyType
};

export function getTemplateColumns({ elementData, gridTemplateColumns, device }: GetTemplateColumnsParams) {
    const paddingX = elementData[device]?.paddingX ?? DEVICE_DEFAULTS[device].paddingX;
    const width = elementData[device]?.width ?? DEVICE_DEFAULTS[device].width;

    return [
        `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`,
        ...gridTemplateColumns,
        `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`
    ]
        .map((col) => {
            if (isNaN(Number(col))) return col;
            return `${(col as number / width).toPrecision(3)}fr`;
        })
        .join(' ');
};