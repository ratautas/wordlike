export function getLayoutStyle(
  element,
  dragDiffX,
  dragDiffY,
  draggedControl,
  isElementDragged
) {
  const position = isElementDragged
    ? getPosition(element, dragDiffX, dragDiffY, draggedControl)
    : element.layout.default;

  const absoluteStyle = Object.entries({
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: `${position.width}px`,
    height: `${position.height}px`,
  }).map(([key, value]) => `${key}:${value}`).join(";");

  return absoluteStyle;
}

export function getPosition(elementData, diffX, diffY, control) {
  const { layout } = elementData;
  switch (control) {
    case "top":
      return {
        x: layout.default.x,
        y: layout.default.y + diffY,
        width: layout.default.width,
        height: layout.default.height - diffY,
      };
    case "right":
      return {
        x: layout.default.x,
        y: layout.default.y,
        width: layout.default.width + diffX,
        height: layout.default.height,
      };
    case "bottom":
      return {
        x: layout.default.x,
        y: layout.default.y,
        width: layout.default.width,
        height: layout.default.height + diffY,
      };
    case "left":
      return {
        x: layout.default.x + diffX,
        y: layout.default.y,
        width: layout.default.width - diffX,
        height: layout.default.height,
      };
    case "topRight":
      return {
        x: layout.default.x,
        y: layout.default.y + diffY,
        width: layout.default.width + diffX,
        height: layout.default.height - diffY,
      };
    case "topLeft":
      return {
        x: layout.default.x + diffX,
        y: layout.default.y + diffY,
        width: layout.default.width - diffX,
        height: layout.default.height - diffY,
      };
    case "bottomRight":
      return {
        x: layout.default.x,
        y: layout.default.y,
        width: layout.default.width + diffX,
        height: layout.default.height + diffY,
      };
    case "bottomLeft":
      return {
        x: layout.default.x + diffX,
        y: layout.default.y,
        width: layout.default.width - diffX,
        height: layout.default.height + diffY,
      };
    default:
      return {
        x: layout.default.x + diffX,
        y: layout.default.y + diffY,
        width: layout.default.width,
        height: layout.default.height,
      };
  }
}
