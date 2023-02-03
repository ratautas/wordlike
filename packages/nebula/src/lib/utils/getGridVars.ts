
import { calculateGrid } from '$lib/utils/calculateGrid';
import { getTemplateRows } from '$lib/utils/getTemplateRows';
import { getTemplateColumns } from '$lib/utils/getTemplateColumns';
import { DEVICE_KEYS } from '$lib/constants';
import type { DeviceKeyType, GridElementType } from '$lib/schema';

interface GridVars {
    gridCssVars?: string, // --desktop-rows: 1fr 1fr 1fr; --desktop-columns: 1fr 1fr 1fr;
    elementCssVars?: string[] // [--desktop-area: 1 / 1 / 2 / 3; --mobile-area: 1 / 1 / 2 / 3;];
}

export function getGridVars(elementData: GridElementType): GridVars {
    return Object.values(DEVICE_KEYS).reduce((acc, deviceKey) => {
        const { gridTemplateRows, gridTemplateColumns, gridAreas } = calculateGrid({
            elementData,
            device: deviceKey
        });

        const templateRows = getTemplateRows({
            elementData,
            gridTemplateRows,
            device: deviceKey
        });

        const templateColumns = getTemplateColumns({
            elementData,
            gridTemplateColumns,
            device: deviceKey
        });

        acc.gridCssVars += `--${deviceKey}-rows: ${templateRows}; --${deviceKey}-columns: ${templateColumns};`;

        gridAreas?.forEach((area, index) => {
            acc.elementCssVars[index] ??= '';
            acc.elementCssVars[index] += `--${deviceKey}-area: ${area};`;
        });

        return acc;
    }, {
        gridCssVars: '',
        elementCssVars: [] as string[]
    });
};