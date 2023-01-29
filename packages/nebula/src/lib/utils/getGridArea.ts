export type GridDataType = {
  rowStartIndex?: number
  columnStartIndex?: number
  rowEndIndex?: number
  columnEndIndex?: number
  columnCount?: number
  snapLeft?: boolean
  snapRight?: boolean
};

export function getGridArea({
  rowStartIndex,
  columnStartIndex,
  rowEndIndex,
  columnEndIndex,
  columnCount,
  snapLeft,
  snapRight,
}: GridDataType = {}) {
  if (!rowStartIndex) return null;
  if (!columnStartIndex) return null;
  if (!rowEndIndex) return null;
  if (!columnCount) return null;
  if (!columnEndIndex) return null;

  return [
    rowStartIndex + 1,
    snapLeft ? 1 : columnStartIndex + 1,
    rowEndIndex + 1,
    snapRight ? columnCount + 2 : columnEndIndex + 1,
  ].join("/");
};