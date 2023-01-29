export const DEFAULT_DESKTOP_GRID_WIDTH = 1224;
export const DEFAULT_TABLET_GRID_WIDTH = 768;
export const DEFAULT_MOBILE_GRID_WIDTH = 375;

export const BREAKPOINTS = {
    DESKTOP: {
        key: 'desktop',
        value: 1224,
    },
    TABLET: {
        key: 'tablet',
        value: 768,
    },
    MOBILE: {
        key: 'mobile',
        value: 375,
    },
};

export const ELEMENT_TYPES = {
    TEXT: 'TEXT',
    IMAGE: 'IMAGE',
    GRID: 'GRID',
};

export const VERTICAL_RESIZE_TYPES = [
    ELEMENT_TYPES.IMAGE,
    ELEMENT_TYPES.GRID,
];

export const DEVICE_DEFAULTS = {
    desktop: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        paddingX: 24,
        paddingY: 24,
    },
    tablet: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        paddingX: 24,
        paddingY: 24,
    },
    mobile: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        paddingX: 24,
        paddingY: 24,
    },
};