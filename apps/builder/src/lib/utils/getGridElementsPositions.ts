import { ELEMENT_TYPES } from "@wordlike/nebula";
import type { DeviceKeyType, GridElementType, ElementType } from "@wordlike/nebula/package/schema";
import { elagetBoundedElement } from "$lib/utils/elagetBoundedElement";

export type GetGridElementsPositionsParams = {
    elementData: GridElementType;
    isDragging: boolean;
    selectedElementIds: string[];
    diffX: number | null;
    diffY: number | null;
    device: DeviceKeyType;
    resizeDirection: string | null;
};

export function getGridElementsPositions({
    elementData,
    isDragging,
    selectedElementIds,
    diffX,
    diffY,
    device,
    resizeDirection,
}: GetGridElementsPositionsParams) {
    console.log({ resizeDirection })
    if (elementData.type !== ELEMENT_TYPES.GRID) return elementData;
    if (!isDragging) return elementData;

    return {
        ...elementData,
        children: elementData.children.map((child: ElementType) => {
            if (!selectedElementIds.includes(child.id)) return child;

            return elagetBoundedElement({
                elementData: child,
                gridElementData: elementData,
                device,
                diffX,
                diffY,
                resizeDirection,
            });
        }),
    };
}