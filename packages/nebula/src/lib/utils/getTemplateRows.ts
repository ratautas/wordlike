import { DEVICE_DEFAULTS } from '$lib/constants';
import type { GridElementType, DeviceKeyType } from '$lib/schema';

export type GetTemplateRowsParams = {
    elementData: GridElementType
    gridTemplateRows: number[]
    device: DeviceKeyType
};

export function getTemplateRows({ elementData, gridTemplateRows, device }: GetTemplateRowsParams) {
    return [
        elementData[device]?.paddingY ?? DEVICE_DEFAULTS[device].paddingY,
        ...gridTemplateRows,
        elementData[device]?.paddingY ?? DEVICE_DEFAULTS[device].paddingY
    ]
        .map((row) => `minmax(${row}px, 0fr)`)
        .join(' ');
};