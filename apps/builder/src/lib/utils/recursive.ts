import type { ElementType, GridElementType } from '@wordlike/schema/types';

type ElType = ElementType & GridElementType | undefined;

export function findById(element: ElType, id: string): ElType | undefined {
    return element?.id === id && element || findById(element?.children, id);
}

export function filterById(element: ElType, id: string): ElType | undefined {
    if (element?.id === id) return element;
    if (element?.children) {
        return {
            ...element,
            children: element.children.map((child: ElType) => filterById(child, id)).filter(Boolean),
        };
    }
    return element;
};

export function filterElementsByIds(element: ElType, ids: string[]): ElType | undefined {
    if (ids.includes(element?.id)) return false;
    if (element?.children) {
        return {
            ...element,
            children: element.children.map((child: ElType) => filterElementsByIds(child, ids)).filter(Boolean),
        };
    }
    return element;
}

export function findParentById(element: ElType, id: string): ElType | undefined {
    if (element?.children?.find((child) => child.id === id)) return element;
    return element?.children?.reduce((acc, child) => {
        return findParentById(child, id) || acc;
    }, undefined);
};

export function findParentIndexById(element: ElType, id: string): number | undefined {
    if (element?.children?.find((child) => child.id === id)) {
        return element.children.findIndex((child) => child.id === id);
    }
    return element?.children?.reduce((acc, child) => {
        return findParentIndexById(child, id) || acc;
    }, undefined);
};

export function findElementIndexById(element: ElType, id: string): number | undefined {
    if (element?.id === id) return 0;
    if (element?.children) {
        return element.children.reduce((acc, child, index) => {
            return findElementIndexById(child, id) || acc;
        }, undefined);
    }
    return undefined;
};

export function findElementsByIds(elements, ids) {
    return elements?.reduce((acc, el) => {
        if (ids.includes(el.id)) {
            return { ...acc, [el.id]: el };
        }
        if (el.children) {
            const childrenIds = findElementsByIds(el.children, ids);
            if (childrenIds) {
                return { ...acc, ...childrenIds };
            }
        }
        return acc;
    }, {});
}