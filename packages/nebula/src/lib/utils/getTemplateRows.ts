import { DEVICE_DEFAULTS } from '$lib/constants';
import type { GridElementType, DeviceKeyType } from '$lib/schema';

export type GetTemplateRowsParams = {
    elementData: GridElementType
    gridTemplateRows: number[]
    deviceKey: DeviceKeyType
};

export function getTemplateRows({ elementData, gridTemplateRows, deviceKey }: GetTemplateRowsParams) {
    return [
        elementData[deviceKey]?.paddingY ?? DEVICE_DEFAULTS[deviceKey].paddingY,
        ...gridTemplateRows,
        elementData[deviceKey]?.paddingY ?? DEVICE_DEFAULTS[deviceKey].paddingY
    ]
        .map((row) => `minmax(${row}px, 0fr)`)
        .join(' ');
};