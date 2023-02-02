import { ELEMENT_TYPES } from "@wordlike/nebula";
import type { DeviceKeyType, GridElementType, ElementType } from "@wordlike/nebula/package/schema";
import { getBoundedPosition } from "$lib/utils/getBoundedPosition";

export type GetGridElementsPositionsParams = {
    elementData: GridElementType;
    isDragging: boolean;
    selectedElementIds: string[];
    diffX: number | null;
    diffY: number | null;
    device: DeviceKeyType;
};

export function getGridElementsPositions({
    elementData,
    isDragging,
    selectedElementIds,
    diffX,
    diffY,
    device,
}: GetGridElementsPositionsParams) {
    if (elementData.type !== ELEMENT_TYPES.GRID) return elementData;
    if (!isDragging) return elementData;

    return {
        ...elementData,
        children: elementData.children.map((child: ElementType) => {
            if (!selectedElementIds.includes(child.id)) return child;

            return getBoundedPosition({
                elementData: child,
                gridElementData: elementData,
                device,
                diffX,
                diffY,
            });
        }),
    };
}