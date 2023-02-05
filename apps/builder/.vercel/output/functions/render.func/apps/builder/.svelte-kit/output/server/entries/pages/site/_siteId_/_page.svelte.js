import { c as create_ssr_component, h as spread, j as escape_object, k as createEventDispatcher, o as onDestroy, f as add_attribute, l as get_store_value, a as subscribe, v as validate_component, e as escape, p as null_to_empty, q as add_styles, d as each } from "../../../../chunks/index3.js";
import { w as writable, d as derived } from "../../../../chunks/index2.js";
import { d as doc, c as currentPageIndex, a as currentPageData } from "../../../../chunks/doc.js";
import "../../../../chunks/supabase.js";
import "@tiptap/extension-text";
import "@tiptap/extension-bold";
import "@tiptap/extension-italic";
import "@tiptap/extension-underline";
import "@tiptap/extension-document";
import "@tiptap/extension-paragraph";
import "@tiptap/extension-link";
import "@tiptap/extension-heading";
import "@tiptap/extension-strike";
import "@tiptap/extension-text-align";
import "@tiptap/extension-list-item";
import "@tiptap/extension-bullet-list";
import "@tiptap/extension-ordered-list";
const refStore = writable({});
const Textarea_t = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="currentColor"><path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2z"/><path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z"/></g>`}<!-- HTML_TAG_END --></svg>`;
});
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="currentColor"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></g>`}<!-- HTML_TAG_END --></svg>`;
});
const Suit_diamond = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468zM6.848.613a1.39 1.39 0 0 1 2.304 0l4.56 6.468a1.61 1.61 0 0 1 0 1.838l-4.56 6.468a1.39 1.39 0 0 1-2.304 0L2.288 8.92a1.61 1.61 0 0 1 0-1.838L6.848.613z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const isDragging = writable(false);
const isDragInserting = writable(false);
const isClickInserting = writable(false);
const resizeDirection = writable(null);
const mouseMoveEvent = writable();
const initialMousePosition = writable({
  x: null,
  y: null
});
const dragMousePosition = writable({
  x: null,
  y: null
});
const dragDiffX = derived(
  [initialMousePosition, dragMousePosition],
  ([$initialMousePosition, $dragMousePosition]) => {
    if ($initialMousePosition.x === null || $dragMousePosition.x === null)
      return null;
    return $dragMousePosition.x - $initialMousePosition.x;
  }
);
const dragDiffY = derived(
  [initialMousePosition, dragMousePosition],
  ([$initialMousePosition, $dragMousePosition]) => {
    if ($initialMousePosition.y === null || $dragMousePosition.y === null)
      return null;
    return $dragMousePosition.y - $initialMousePosition.y;
  }
);
const hasDragged = derived(
  [dragDiffX, dragDiffY],
  ([$x, $y]) => {
    return $x !== null && $x !== 0 && $y !== null && $y !== 0;
  }
);
const isInserting = derived(
  [isDragInserting, isClickInserting],
  ([$isDragInserting, $isClickInserting]) => {
    return $isDragInserting || $isClickInserting;
  }
);
const mouseMoveComposedPath = derived(
  [mouseMoveEvent],
  ([$mouseMoveEvent]) => {
    return $mouseMoveEvent?.composedPath() ?? [];
  }
);
const Text_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".text.svelte-1tgc0nl{overflow-wrap:break-word}.text.svelte-1tgc0nl h1{font-size:2rem;font-weight:700}.text.svelte-1tgc0nl h2{font-size:1.5rem;font-weight:700}.text.svelte-1tgc0nl h3{font-size:1.3rem;font-weight:700}.text.svelte-1tgc0nl h4{font-size:1rem;font-weight:700}.text.svelte-1tgc0nl ul{list-style:disc;padding-left:1.5rem}.text.svelte-1tgc0nl ol{list-style:decimal;padding-left:1.5rem}.text.svelte-1tgc0nl li{margin-bottom:0.5rem}",
  map: null
};
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const dispatch = createEventDispatcher();
  let { elementData } = $$props;
  let elementRef;
  onDestroy(() => dispatch("destroy"));
  if ($$props.elementData === void 0 && $$bindings.elementData && elementData !== void 0)
    $$bindings.elementData(elementData);
  $$result.css.add(css$1);
  return `<div class="${"text svelte-1tgc0nl"}"${add_attribute("this", elementRef, 0)}><!-- HTML_TAG_START -->${elementData?.html}<!-- HTML_TAG_END -->
</div>`;
});
const DEVICE_KEYS = {
  DESKTOP: "desktop",
  // TABLET: 'tablet',
  MOBILE: "mobile"
};
const ELEMENT_TYPES$1 = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  GRID: "GRID"
};
const DEVICE_DEFAULTS$1 = {
  desktop: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    paddingX: 24,
    paddingY: 24
  },
  tablet: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    paddingX: 24,
    paddingY: 24
  },
  mobile: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    paddingX: 24,
    paddingY: 24
  }
};
function calculateGrid({ elementData, deviceKey: deviceKey2 }) {
  if (!elementData)
    return {};
  const { rows, columns, positions } = elementData.children?.reduce((acc, element) => {
    const { x, y, width, height, snapLeft, snapRight } = element[deviceKey2] ?? DEVICE_DEFAULTS$1[deviceKey2];
    acc.columns.add(x);
    acc.columns.add(x + width);
    acc.rows.add(y);
    acc.rows.add(y + height);
    acc.positions.push({ x, y, width, height, snapLeft, snapRight });
    return acc;
  }, {
    rows: /* @__PURE__ */ new Set([0]),
    columns: /* @__PURE__ */ new Set([0, elementData[deviceKey2]?.width ?? DEVICE_DEFAULTS$1[deviceKey2].width]),
    positions: []
  });
  const gridRows = [...rows].sort((a, b) => a - b);
  const gridColumns = [...columns].sort((a, b) => a - b);
  const gridHeight = gridRows[gridRows.length - 1];
  const gridAreas = positions.map((position) => {
    const { x, y, width, height, snapLeft, snapRight } = position;
    const rowStartIndex = gridRows.indexOf(y) + 2;
    const rowEndIndex = gridRows.indexOf(y + height) + 2;
    const columnCount2 = gridColumns.length;
    const columnStartIndex = snapLeft ? 1 : gridColumns.indexOf(x) + 2;
    const columnEndIndex = snapRight ? columnCount2 + 2 : gridColumns.indexOf(x + width) + 2;
    return [rowStartIndex, columnStartIndex, rowEndIndex, columnEndIndex].join("/");
  });
  const { gridTemplateRows } = gridRows.filter((i) => i > 0).reduce((acc, row) => {
    const currentRow = row - acc.previousRow;
    return {
      gridTemplateRows: [...acc.gridTemplateRows, currentRow],
      previousRow: acc.previousRow + currentRow
    };
  }, {
    gridTemplateRows: [],
    previousRow: 0
  });
  const { gridTemplateColumns } = gridColumns.filter((i) => i > 0).reduce((acc, column) => {
    const currentColumn = column - acc.previousColumn;
    return {
      gridTemplateColumns: [...acc.gridTemplateColumns, currentColumn],
      previousColumn: acc.previousColumn + currentColumn
    };
  }, {
    gridTemplateColumns: [],
    previousColumn: 0
  });
  return { gridAreas, gridHeight, gridTemplateRows, gridTemplateColumns };
}
function getTemplateRows({ elementData, gridTemplateRows, deviceKey: deviceKey2 }) {
  return [
    elementData[deviceKey2]?.paddingY ?? DEVICE_DEFAULTS$1[deviceKey2].paddingY,
    ...gridTemplateRows,
    elementData[deviceKey2]?.paddingY ?? DEVICE_DEFAULTS$1[deviceKey2].paddingY
  ].map((row) => `minmax(${row}px, 0fr)`).join(" ");
}
function getTemplateColumns({ elementData, gridTemplateColumns, deviceKey: deviceKey2 }) {
  const paddingX = elementData[deviceKey2]?.paddingX ?? DEVICE_DEFAULTS$1[deviceKey2].paddingX;
  const width = elementData[deviceKey2]?.width ?? DEVICE_DEFAULTS$1[deviceKey2].width;
  return [
    `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`,
    ...gridTemplateColumns,
    `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`
  ].map((col) => {
    if (isNaN(Number(col)))
      return col;
    return `${col / width * 1e3}fr`;
  }).join(" ");
}
function getGridVars(elementData) {
  return Object.values(DEVICE_KEYS).reduce((acc, deviceKey2) => {
    const { gridTemplateRows, gridTemplateColumns, gridAreas } = calculateGrid({
      elementData,
      deviceKey: deviceKey2
    });
    const templateRows = getTemplateRows({
      elementData,
      gridTemplateRows,
      deviceKey: deviceKey2
    });
    const templateColumns = getTemplateColumns({
      elementData,
      gridTemplateColumns,
      deviceKey: deviceKey2
    });
    acc.gridCssVars += `--${deviceKey2}-rows: ${templateRows}; --${deviceKey2}-columns: ${templateColumns};`;
    gridAreas?.forEach((area, index) => {
      acc.elementCssVars[index] ??= "";
      acc.elementCssVars[index] += `--${deviceKey2}-area: ${area};`;
    });
    return acc;
  }, {
    gridCssVars: "",
    elementCssVars: []
  });
}
const MIN_WIDTH = 96;
const MIN_HEIGHT = 24;
function getBoundedElement({
  elementData,
  gridElementData,
  diffX,
  diffY,
  resizeDirection: resizeDirection2,
  device
}) {
  const initialPosition = elementData[device];
  const gridWidth = gridElementData[device]?.width ?? DEVICE_DEFAULTS$1[device].width;
  const position = { ...initialPosition };
  if (!resizeDirection2) {
    const minX = Math.max(initialPosition.x + diffX, 0);
    const maxX = gridWidth - initialPosition.width;
    const minY = Math.max(initialPosition.y + diffY, 0);
    const maxY = gridWidth - initialPosition.height;
    if (!initialPosition.snapLeft && !initialPosition.snapRight) {
      position.x = Math.min(minX, maxX);
    }
    position.y = Math.min(minY, maxY);
    return {
      ...elementData,
      [device]: position
    };
  }
  if (resizeDirection2.includes("N")) {
    const minY = Math.max(initialPosition.y + diffY, 0);
    const maxY = initialPosition.y + initialPosition.height - MIN_HEIGHT;
    const minHeight = Math.max(initialPosition.height - diffY, MIN_HEIGHT);
    const maxHeight = initialPosition.y + initialPosition.height;
    position.y = Math.min(minY, maxY);
    position.height = Math.min(minHeight, maxHeight);
    if (resizeDirection2 === "N") {
      return {
        ...elementData,
        [device]: position
      };
    }
  }
  if (resizeDirection2.includes("E")) {
    const minWidth = Math.max(initialPosition.width + diffX, MIN_WIDTH);
    const maxWidth = gridWidth - initialPosition.x;
    position.width = Math.min(minWidth, maxWidth);
    if (resizeDirection2 === "E") {
      return {
        ...elementData,
        [device]: position
      };
    }
  }
  if (resizeDirection2.includes("S")) {
    const minHeight = Math.max(initialPosition.height + diffY, MIN_HEIGHT);
    position.height = Math.min(minHeight, gridWidth - initialPosition.y);
    if (resizeDirection2 === "S") {
      return {
        ...elementData,
        [device]: position
      };
    }
  }
  if (resizeDirection2.includes("W")) {
    const minX = Math.max(initialPosition.x + diffX, 0);
    const maxX = initialPosition.x + initialPosition.width - MIN_WIDTH;
    const minWidth = Math.max(initialPosition.width - diffX, MIN_WIDTH);
    const maxWidth = initialPosition.x + initialPosition.width;
    position.x = Math.min(minX, maxX);
    position.width = Math.min(minWidth, maxWidth);
    if (resizeDirection2 === "W") {
      return {
        ...elementData,
        [device]: position
      };
    }
  }
  return {
    ...elementData,
    [device]: position
  };
}
const deviceKey = writable(DEVICE_KEYS.DESKTOP);
derived(deviceKey, ($key) => $key === DEVICE_KEYS.DESKTOP);
derived(deviceKey, ($key) => $key === DEVICE_KEYS.MOBILE);
const ELEMENT_TYPES = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  GRID: "GRID"
};
const VERTICAL_RESIZE_TYPES = [
  ELEMENT_TYPES.IMAGE,
  ELEMENT_TYPES.GRID
];
const selectedElementIds = writable([]);
const insertingElement = writable();
function findElementsByIds(elements, ids) {
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
const selectedElementsDataMap = derived(
  [doc, selectedElementIds],
  ([$doc, $selectedElementIds]) => {
    if ($selectedElementIds.length === 0)
      return {};
    return findElementsByIds(
      $doc.pages[get_store_value(currentPageIndex)].children,
      $selectedElementIds
    );
  }
);
function recalculatePositions() {
  function mapChildren(el) {
    if (el.type !== ELEMENT_TYPES.GRID)
      return el;
    const $refStore = get_store_value(refStore);
    if (!Object.keys($refStore).length)
      return el;
    return {
      ...el,
      children: el.children?.map((element) => {
        const elementRef = $refStore[element.id];
        const gridRef = $refStore[`${el.id}::GRID`];
        const $deviceKey = get_store_value(deviceKey);
        const position = element[$deviceKey];
        const { x, width, snapLeft, snapRight } = position;
        const snap = snapLeft || snapRight;
        if (!elementRef)
          return element;
        if (!gridRef)
          return element;
        const gridRect = gridRef.getBoundingClientRect();
        const elementRect = elementRef.getBoundingClientRect();
        return {
          ...element,
          [$deviceKey]: {
            ...element[$deviceKey],
            x: snap ? x : elementRect.x - gridRect.x,
            y: elementRect.y - gridRect.y,
            width: snap ? width : elementRect.width,
            height: elementRect.height
          },
          children: element.children?.map(mapChildren)
        };
      })
    };
  }
  const pageIndex = get_store_value(currentPageIndex);
  doc.update(($doc) => {
    $doc.pages[pageIndex].children = $doc.pages[pageIndex].children.map(mapChildren);
    return $doc;
  });
}
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isInserting, $$unsubscribe_isInserting;
  $$unsubscribe_isInserting = subscribe(isInserting, (value) => $isInserting = value);
  $$unsubscribe_isInserting();
  return `
<header class="${"sticky left-0 right-0 top-0 z-50 bg-white"}">${!$isInserting ? `<div class="${"flex p-2 justify-center"}"><button class="${"group/action flex flex-col items-center justify-center w-12 h-12 mx-1 rounded hover:bg-gray-100 relative cursor-grab"}"><div class="${"flex flex-col items-center"}">${validate_component(Textarea_t, "BiTextareaT").$$render($$result, {}, {}, {})}
          <div class="${"text-xs pointer-events-none"}">Text</div></div>
        <div class="${"hidden group-hover/action:block absolute -left-8 -right-8 top-full text-xs"}"><div class="${"flex p-2"}">Paragraph <span>(default)</span> [t]
          </div>
          <div class="${"flex"}">Heading [h]</div>
          <div class="${"flex"}">Button [b]</div>
          <div class="${"flex"}">Custom 1</div>
          <div class="${"flex"}">Custom 2</div>
          <div class="${"flex"}">Edit Custom Elements</div></div></button>
      <button class="${"group/action flex flex-col items-center justify-center w-12 h-12 mx-1 rounded hover:bg-gray-100 relative"}">${validate_component(Image, "BiImage").$$render($$result, { class: "pointer-events-none" }, {}, {})}
        <div class="${"text-xs pointer-events-none"}">Image</div>
        <div class="${"hidden group-hover/action:block absolute -left-8 -right-8 top-full text-xs"}"><div class="${"flex"}">Media Library <span>(default)</span> [m]</div>
          <div class="${"flex"}">Upload [u]</div>
          <div class="${"flex"}">Icon [i]</div>
          <div class="${"flex"}">Free Resources [f]</div>
          <div class="${"flex"}">GIFs [g]</div></div></button>
      <button class="${"group/action flex flex-col items-center justify-center w-12 h-12 mx-1 rounded hover:bg-gray-100 relative"}">${validate_component(Suit_diamond, "BiSuitDiamond").$$render($$result, { class: "pointer-events-none" }, {}, {})}
        <div class="${"text-xs pointer-events-none"}">Shape</div>
        <div class="${"hidden group-hover/action:block absolute -left-8 -right-8 top-full text-xs"}"><div class="${"flex"}">Rectangle [r]</div>
          <div class="${"flex"}">Line [l]</div>
          <div class="${"flex"}">Polylgon [p]</div>
          <div class="${"flex"}">Draw [d]</div></div></button></div>` : `<div class="${"h-16 animate-bounce flex justify-center items-center"}">drag and release
    </div>`}</header>`;
});
const isShiftPressed = writable(false);
const ElementControls_svelte_svelte_type_style_lang = "";
const css = {
  code: '.side.svelte-1w0240t{position:absolute;z-index:4}.side.svelte-1w0240t::before{content:"";display:block;position:absolute;background-color:#fff;min-width:8px;min-height:8px;transform:translate3d(-50%, -50%, 0);top:50%;left:50%;border-radius:4px;border:solid 1px cadetblue;max-width:calc(100% - 16px)}.side.svelte-1w0240t::after{content:"";display:block;position:absolute;border:dotted 1px cadetblue;width:2px;height:2px;transform:translate3d(-50%, -50%, 0);top:50%;left:50%;max-width:calc(100% - 32px);opacity:0.5}.side--n.svelte-1w0240t{cursor:row-resize;height:8px;top:-16px;left:0;right:0}.side--n.svelte-1w0240t::before{width:24px}.side--n.svelte-1w0240t::after{width:12px}.side--e.svelte-1w0240t{cursor:col-resize;width:8px;right:-16px;top:0;bottom:0}.side--e.svelte-1w0240t::before{height:24px}.side--e.svelte-1w0240t::after{height:12px}.side--s.svelte-1w0240t{height:8px;bottom:-16px;left:0;right:0;cursor:row-resize}.side--s.svelte-1w0240t::before{width:24px}.side--s.svelte-1w0240t::after{width:12px}.side--w.svelte-1w0240t{width:8px;left:-16px;top:0;bottom:0;cursor:col-resize}.side--w.svelte-1w0240t::before{height:24px}.side--w.svelte-1w0240t::after{height:12px}.side--GRID.side--e.svelte-1w0240t{right:calc((100% - var(--desktop-width) - 4px) / 2)}.side--GRID.side--w.svelte-1w0240t{left:calc((100% - var(--desktop-width) - 4px) / 2)}.corner.svelte-1w0240t{position:absolute;width:8px;height:8px;border:solid 1px cadetblue;background-color:#fff;border-radius:4px;z-index:3}.corner--ne.svelte-1w0240t{right:-4px;top:-4px;cursor:nesw-resize}.corner--nw.svelte-1w0240t{left:-4px;top:-4px;cursor:nwse-resize}.corner--se.svelte-1w0240t{right:-4px;bottom:-4px;cursor:nwse-resize}.corner--sw.svelte-1w0240t{left:-4px;bottom:-4px;cursor:nesw-resize}',
  map: null
};
const ElementControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let id;
  let type;
  let canResizeHeight;
  let canResizeTop;
  let { elementData } = $$props;
  if ($$props.elementData === void 0 && $$bindings.elementData && elementData !== void 0)
    $$bindings.elementData(elementData);
  $$result.css.add(css);
  ({ id, type } = elementData ?? {});
  canResizeHeight = VERTICAL_RESIZE_TYPES.includes(type);
  canResizeTop = type !== ELEMENT_TYPES.GRID;
  return `<div class="${"absolute inset-0 z-[-1] opacity-30 ring-dark-50 ring-opacity-5 ring-[1px] group-hover/element:opacity-100"}"><div class="${escape(null_to_empty(`side side--e side--${type}`), true) + " svelte-1w0240t"}"></div>
  <div class="${escape(null_to_empty(`side side--w side--${type}`), true) + " svelte-1w0240t"}"></div>
  ${canResizeHeight ? `${canResizeTop ? `<div class="${escape(null_to_empty(`side side--n side--${type}`), true) + " svelte-1w0240t"}"></div>` : ``}
    <div class="${escape(null_to_empty(`side side--s side--${type}`), true) + " svelte-1w0240t"}"></div>
    <div class="${escape(null_to_empty(`corner corner--ne corner--${type}`), true) + " svelte-1w0240t"}"></div>
    <div class="${escape(null_to_empty(`corner corner--nw corner--${type}`), true) + " svelte-1w0240t"}"></div>
    <div class="${escape(null_to_empty(`corner corner--se corner--${type}`), true) + " svelte-1w0240t"}"></div>
    <div class="${escape(null_to_empty(`corner corner--sw corner--${type}`), true) + " svelte-1w0240t"}"></div>` : ``}
</div>`;
});
function getGuideMap({ isDragging: isDragging2, isInserting: isInserting2, selectedElementsDataMap: selectedElementsDataMap2, rowArray, columnArray, columnWidth, rowHeight: rowHeight2, gap: gap2, diffX, diffY, resizeDirection: resizeDirection2, elementData, device }) {
  return rowArray.map((_, row) => {
    return columnArray.map((_2, col) => {
      if (!isDragging2 && !isInserting2)
        return false;
      return Object.entries(selectedElementsDataMap2).some(([_3, selectedElementData]) => {
        const { x, y, width, height, type } = getBoundedElement({
          elementData: selectedElementData,
          gridElementData: elementData,
          device,
          diffX,
          diffY,
          resizeDirection: resizeDirection2
        })[device];
        if (type === ELEMENT_TYPES.GRID)
          return false;
        const cellLeft = col * (columnWidth + gap2) + columnWidth;
        const cellRight = cellLeft - columnWidth + gap2;
        const cellTop = row * (rowHeight2 + gap2) + rowHeight2;
        const cellBottom = cellTop - rowHeight2 + gap2;
        const withinY = y <= cellTop && cellBottom <= y + height;
        const withinX = x <= cellLeft && cellRight <= x + width;
        return withinX && withinY;
      });
    });
  });
}
let columnCount = 12;
let gap = 12;
let rowHeight = 36;
const Guides = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gridHeight;
  let width;
  let gapPx;
  let columnArray;
  let columnWidth;
  let columnWidthPercent;
  let rowCount;
  let rowArray;
  let rowHeightPx;
  let guideMap;
  let $deviceKey, $$unsubscribe_deviceKey;
  let $resizeDirection, $$unsubscribe_resizeDirection;
  let $dragDiffY, $$unsubscribe_dragDiffY;
  let $dragDiffX, $$unsubscribe_dragDiffX;
  let $selectedElementsDataMap, $$unsubscribe_selectedElementsDataMap;
  let $isInserting, $$unsubscribe_isInserting;
  let $isDragging, $$unsubscribe_isDragging;
  $$unsubscribe_deviceKey = subscribe(deviceKey, (value) => $deviceKey = value);
  $$unsubscribe_resizeDirection = subscribe(resizeDirection, (value) => $resizeDirection = value);
  $$unsubscribe_dragDiffY = subscribe(dragDiffY, (value) => $dragDiffY = value);
  $$unsubscribe_dragDiffX = subscribe(dragDiffX, (value) => $dragDiffX = value);
  $$unsubscribe_selectedElementsDataMap = subscribe(selectedElementsDataMap, (value) => $selectedElementsDataMap = value);
  $$unsubscribe_isInserting = subscribe(isInserting, (value) => $isInserting = value);
  $$unsubscribe_isDragging = subscribe(isDragging, (value) => $isDragging = value);
  let { elementData } = $$props;
  if ($$props.elementData === void 0 && $$bindings.elementData && elementData !== void 0)
    $$bindings.elementData(elementData);
  ({ gridHeight } = calculateGrid({ elementData, deviceKey: $deviceKey }));
  ({ width } = elementData?.[$deviceKey] ?? DEVICE_DEFAULTS[$deviceKey]);
  gapPx = `${gap}px`;
  columnArray = Array.from(Array(columnCount));
  columnWidth = (width + gap) / columnCount - gap;
  columnWidthPercent = `${columnWidth / width * 100}%`;
  rowCount = Math.floor(gridHeight / rowHeight) ?? 0;
  rowArray = Array.from(Array(rowCount));
  rowHeightPx = `${rowHeight}px`;
  guideMap = getGuideMap({
    isDragging: $isDragging,
    isInserting: $isInserting,
    selectedElementsDataMap: $selectedElementsDataMap,
    rowArray,
    columnArray,
    columnWidth,
    rowHeight,
    gap,
    diffX: $dragDiffX,
    diffY: $dragDiffY,
    resizeDirection: $resizeDirection,
    elementData,
    device: $deviceKey
  });
  $$unsubscribe_deviceKey();
  $$unsubscribe_resizeDirection();
  $$unsubscribe_dragDiffY();
  $$unsubscribe_dragDiffX();
  $$unsubscribe_selectedElementsDataMap();
  $$unsubscribe_isInserting();
  $$unsubscribe_isDragging();
  return `<div class="${[
    "flex flex-col content-start gap-[var(--gap)] opacity-0",
    $isDragging || $isInserting ? "opacity-100" : ""
  ].join(" ").trim()}"${add_styles({
    "--column-width": columnWidthPercent,
    "--row-height": rowHeightPx,
    "--gap": gapPx
  })}>${each(guideMap, (row) => {
    return `<div class="${"row flex justify-between h-[var(--row-height)] gap-[var(--gap)]"}">${each(row, (column) => {
      return `<div class="${[
        "column w-[var(--column-width)] text-xs border-[1px] border-solid border-gray-300 rounded-sm transition-all",
        (column ? "shadow-[1px_1px_4px_0px_rgba(0,0,0,.1)]" : "") + " " + (column ? "scale-105" : "") + " " + (column ? "border-transparent" : "")
      ].join(" ").trim()}"></div>`;
    })}
    </div>`;
  })}</div>`;
});
const SideOvershoots = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let overShoot;
  let growLeft;
  let growRight;
  let $mouseMoveEvent, $$unsubscribe_mouseMoveEvent;
  let $resizeDirection, $$unsubscribe_resizeDirection;
  let $isDragging, $$unsubscribe_isDragging;
  $$unsubscribe_mouseMoveEvent = subscribe(mouseMoveEvent, (value) => $mouseMoveEvent = value);
  $$unsubscribe_resizeDirection = subscribe(resizeDirection, (value) => $resizeDirection = value);
  $$unsubscribe_isDragging = subscribe(isDragging, (value) => $isDragging = value);
  let { elementData } = $$props;
  let { isHovered = false } = $$props;
  let guidesRef;
  if ($$props.elementData === void 0 && $$bindings.elementData && elementData !== void 0)
    $$bindings.elementData(elementData);
  if ($$props.isHovered === void 0 && $$bindings.isHovered && isHovered !== void 0)
    $$bindings.isHovered(isHovered);
  overShoot = (() => {
    if (!$isDragging)
      return;
    if (elementData.type !== ELEMENT_TYPES$1.GRID)
      return;
    if (!$resizeDirection)
      return;
    const { x, width } = {};
    const { clientX } = $mouseMoveEvent;
    if (!x || !width)
      return;
    if ($resizeDirection.includes("W") && clientX - x < 0)
      return "LEFT";
    if ($resizeDirection.includes("E") && clientX - x > width)
      return "RIGHT";
    return;
  })();
  growLeft = (() => {
    if (!isHovered && overShoot !== "LEFT")
      return 0;
    const { clientX } = $mouseMoveEvent ?? {};
    const { x } = {};
    if (!x)
      return 8;
    return 8 + (x - clientX) / 16;
  })();
  growRight = (() => {
    if (!isHovered && overShoot !== "RIGHT")
      return 0;
    const { clientX } = $mouseMoveEvent ?? {};
    const { x, width } = {};
    if (!x || !width)
      return 8;
    return 8 + (clientX - x - width) / 16;
  })();
  $$unsubscribe_mouseMoveEvent();
  $$unsubscribe_resizeDirection();
  $$unsubscribe_isDragging();
  return `${$resizeDirection ? `<div class="${"opacity-0 pointer-events-none grid [grid-area:2/2/-2/-2]"}"${add_attribute("this", guidesRef, 0)}></div>
    <div class="${[
    "absolute left-0 bg-black inset-y-0 hover:opacity-30 opacity-0 w-[var(--grow-left)] transition-opacity",
    isHovered && overShoot === "LEFT" ? "opacity-10" : ""
  ].join(" ").trim()}"${add_styles({ "--grow-left": `${growLeft}px` })}></div>
    <div class="${[
    "absolute right-0 bg-black inset-y-0 hover:opacity-30 opacity-0 w-[var(--grow-right)] transition-opacity",
    isHovered && overShoot === "RIGHT" ? "opacity-10" : ""
  ].join(" ").trim()}"${add_styles({ "--grow-right": `${growRight}px` })}></div>` : ``}`;
});
const Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Type_bold = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823c0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244c0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415c0 .943-.643 1.449-1.832 1.449H5.907z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Type_italic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M7.991 11.674L9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Text_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Link_45deg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="currentColor"><path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199a2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></g>`}<!-- HTML_TAG_END --></svg>`;
});
const Text_center = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Text_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Justify = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const TextControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"relative group/btn hover:bg-gray-100"}">${slots.tooltip ? slots.tooltip({}) : ``}
    ${slots.default ? slots.default({}) : ``}
    ${slots.dropdown ? slots.dropdown({}) : ``}</div>`;
});
const TextControlTooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"absolute -translate-x-1/2 left-1/2 bottom-full opacity-0 pointer-events-none pb-1 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"}"><div class="${"bg-gray-900 text-xs bg-opacity-70 text-white px-2 py-1 rounded h-6"}">${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Kbd = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { key } = $$props;
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  return `<kbd class="${"px-1 rounded border-white bg-white bg-opacity-20 border-[1px] border-opacity-70 leading-none"}">${escape(key)}</kbd>`;
});
const BuilderText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isBold;
  let isItalic;
  let isLeftAligned;
  let isCenterAligned;
  let isRightAligned;
  let isJustified;
  let { elementData } = $$props;
  let editor;
  let controlsRef;
  let top = "0px";
  let left = "0px";
  if ($$props.elementData === void 0 && $$bindings.elementData && elementData !== void 0)
    $$bindings.elementData(elementData);
  isBold = editor?.isActive("bold");
  isItalic = editor?.isActive("italic");
  isLeftAligned = editor?.isActive({ textAlign: "left" });
  isCenterAligned = editor?.isActive({ textAlign: "center" });
  isRightAligned = editor?.isActive({ textAlign: "right" });
  isJustified = editor?.isActive({ textAlign: "justify" });
  return `${validate_component(Text, "Text").$$render($$result, { elementData }, {}, {})}


<div class="${[
    "opacity-0 z-10 absolute controls whitespace-nowrap bg-white text-sm text-left flex items-center rounded-full",
    " "
  ].join(" ").trim()}"${add_styles({ top, left })}${add_attribute("this", controlsRef, 0)}>${validate_component(TextControl, "TextControl").$$render($$result, {}, {}, {
    tooltip: () => {
      return `${validate_component(TextControlTooltip, "TextControlTooltip").$$render($$result, { slot: "tooltip" }, {}, {
        default: () => {
          return `${escape("More")} Tools
        `;
        }
      })}`;
    },
    default: () => {
      return `<button class="${[
        "px-1 flex items-center h-7 rounded-tl-full rounded-bl-full",
        ""
      ].join(" ").trim()}" type="${"button"}">${validate_component(Chevron_left, "BiChevronLeft").$$render($$result, {}, {}, {})}</button>`;
    }
  })}

    ${validate_component(TextControl, "TextControl").$$render($$result, {}, {}, {
    dropdown: () => {
      return `<div slot="${"dropdown"}" class="${"absolute left-0 top-full whitespace-normal opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"}"><div class="${"text-sm bg-white text-left rounded"}"><button type="${"button"}" class="${"whitespace-nowrap text-left p-1 text-ellipsis overflow-hidden w-full"}">Title (h1)
                </button>
                <button type="${"button"}" class="${"whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"}">Subtitle (h2)
                </button>
                <button type="${"button"}" class="${"whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"}">Small Subtitle (h3)
                </button>
                <button type="${"button"}" class="${"whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"}">Text (p)
                </button></div></div>`;
    },
    tooltip: () => {
      return `${validate_component(TextControlTooltip, "TextControlTooltip").$$render($$result, { slot: "tooltip" }, {}, {
        default: () => {
          return `Text style`;
        }
      })}`;
    },
    default: () => {
      return `<div class="${"px-2 py-1 w-12 overflow-hidden text-ellipsis"}">Text</div>`;
    }
  })}

    ${``}

    ${validate_component(TextControl, "TextControl").$$render($$result, {}, {}, {
    tooltip: () => {
      return `${validate_component(TextControlTooltip, "TextControlTooltip").$$render($$result, { slot: "tooltip" }, {}, {
        default: () => {
          return `Bold ${validate_component(Kbd, "Kbd").$$render($$result, { key: "⌘" }, {}, {})} + ${validate_component(Kbd, "Kbd").$$render($$result, { key: "B" }, {}, {})}`;
        }
      })}`;
    },
    default: () => {
      return `<button class="${[
        "w-7 h-7 flex justify-center items-center cursor-pointer",
        (isBold ? "text-green-700" : "") + " " + (isBold ? "bg-green-50" : "")
      ].join(" ").trim()}" type="${"button"}">${validate_component(Type_bold, "BiTypeBold").$$render($$result, {}, {}, {})}</button>`;
    }
  })}

    ${validate_component(TextControl, "TextControl").$$render($$result, {}, {}, {
    tooltip: () => {
      return `${validate_component(TextControlTooltip, "TextControlTooltip").$$render($$result, { slot: "tooltip" }, {}, {
        default: () => {
          return `Italic ${validate_component(Kbd, "Kbd").$$render($$result, { key: "⌘" }, {}, {})} + ${validate_component(Kbd, "Kbd").$$render($$result, { key: "I" }, {}, {})}`;
        }
      })}`;
    },
    default: () => {
      return `<button class="${[
        "w-7 h-7 flex justify-center items-center cursor-pointer",
        (isItalic ? "text-green-700" : "") + " " + (isItalic ? "bg-green-50" : "")
      ].join(" ").trim()}" type="${"button"}">${validate_component(Type_italic, "BiTypeItalic").$$render($$result, {}, {}, {})}</button>`;
    }
  })}

    ${``}

    ${``}

    ${validate_component(TextControl, "TextControl").$$render($$result, {}, {}, {
    dropdown: () => {
      return `<div slot="${"dropdown"}" class="${"absolute left-1/2 -translate-x-1/2 top-full opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"}"><div class="${"bg-white flex"}"><button type="${"button"}" class="${["p-1 flex justify-center", isLeftAligned ? "bg-green-50" : ""].join(" ").trim()}">${validate_component(Text_left, "BiTextLeft").$$render($$result, {}, {}, {})}</button>
                <button type="${"button"}" class="${["p-1 flex justify-center", isCenterAligned ? "bg-green-50" : ""].join(" ").trim()}">${validate_component(Text_center, "BiTextCenter").$$render($$result, {}, {}, {})}</button>
                <button type="${"button"}" class="${["p-1 flex justify-center", isRightAligned ? "bg-green-50" : ""].join(" ").trim()}">${validate_component(Text_right, "BiTextRight").$$render($$result, {}, {}, {})}</button>
                <button type="${"button"}" class="${["p-1 flex justify-center", isJustified ? "bg-green-50" : ""].join(" ").trim()}">${validate_component(Justify, "BiTextJustify").$$render($$result, {}, {}, {})}</button></div></div>`;
    },
    tooltip: () => {
      return `${validate_component(TextControlTooltip, "TextControlTooltip").$$render($$result, { slot: "tooltip" }, {}, {
        default: () => {
          return `Align Text`;
        }
      })}`;
    },
    default: () => {
      return `<button class="${"w-7 h-7 flex items-center justify-center cursor-pointer group-btn"}" type="${"button"}">${isLeftAligned ? `${validate_component(Text_left, "BiTextLeft").$$render($$result, {}, {}, {})}` : ``}
            ${isCenterAligned ? `${validate_component(Text_center, "BiTextCenter").$$render($$result, {}, {}, {})}` : ``}
            ${isRightAligned ? `${validate_component(Text_right, "BiTextRight").$$render($$result, {}, {}, {})}` : ``}
            ${isJustified ? `${validate_component(Justify, "BiTextJustify").$$render($$result, {}, {}, {})}` : ``}</button>`;
    }
  })}

    ${``}

    ${validate_component(TextControl, "TextControl").$$render($$result, {}, {}, {
    tooltip: () => {
      return `${validate_component(TextControlTooltip, "TextControlTooltip").$$render($$result, { slot: "tooltip" }, {}, {
        default: () => {
          return `Insert Link`;
        }
      })}`;
    },
    default: () => {
      return `<button class="${"w-7 h-7 flex justify-center items-center cursor-pointer"}" type="${"button"}">${validate_component(Link_45deg, "BiLink45deg").$$render($$result, {}, {}, {})}</button>`;
    }
  })}

    ${validate_component(TextControl, "TextControl").$$render($$result, {}, {}, {
    tooltip: () => {
      return `${validate_component(TextControlTooltip, "TextControlTooltip").$$render($$result, { slot: "tooltip" }, {}, {
        default: () => {
          return `Pick a Color`;
        }
      })}`;
    },
    default: () => {
      return `<button class="${"w-7 h-7 flex justify-center items-center cursor-pointer"}" type="${"button"}"><div class="${"w-4 h-4 rounded-full bg-purple-400 border-[1px]"}"></div></button>`;
    }
  })}</div>`;
});
function getGridElementsPositions({
  elementData,
  isDragging: isDragging2,
  selectedElementIds: selectedElementIds2,
  diffX,
  diffY,
  device,
  resizeDirection: resizeDirection2
}) {
  if (elementData.type !== ELEMENT_TYPES$1.GRID)
    return elementData;
  if (!isDragging2)
    return elementData;
  return {
    ...elementData,
    children: elementData.children.map((child) => {
      if (!selectedElementIds2.includes(child.id))
        return child;
      return getBoundedElement({
        elementData: child,
        gridElementData: elementData,
        device,
        diffX,
        diffY,
        resizeDirection: resizeDirection2
      });
    })
  };
}
const BuilderElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let type;
  let id;
  let isSelected;
  let gridElementData;
  let gridCssVars;
  let elementCssVars;
  let $insertingElement, $$unsubscribe_insertingElement;
  let $deviceKey, $$unsubscribe_deviceKey;
  let $mouseMoveEvent, $$unsubscribe_mouseMoveEvent;
  let $isInserting, $$unsubscribe_isInserting;
  let $mouseMoveComposedPath, $$unsubscribe_mouseMoveComposedPath;
  let $resizeDirection, $$unsubscribe_resizeDirection;
  let $dragDiffY, $$unsubscribe_dragDiffY;
  let $dragDiffX, $$unsubscribe_dragDiffX;
  let $selectedElementIds, $$unsubscribe_selectedElementIds;
  let $isDragging, $$unsubscribe_isDragging;
  $$unsubscribe_insertingElement = subscribe(insertingElement, (value) => $insertingElement = value);
  $$unsubscribe_deviceKey = subscribe(deviceKey, (value) => $deviceKey = value);
  $$unsubscribe_mouseMoveEvent = subscribe(mouseMoveEvent, (value) => $mouseMoveEvent = value);
  $$unsubscribe_isInserting = subscribe(isInserting, (value) => $isInserting = value);
  $$unsubscribe_mouseMoveComposedPath = subscribe(mouseMoveComposedPath, (value) => $mouseMoveComposedPath = value);
  $$unsubscribe_resizeDirection = subscribe(resizeDirection, (value) => $resizeDirection = value);
  $$unsubscribe_dragDiffY = subscribe(dragDiffY, (value) => $dragDiffY = value);
  $$unsubscribe_dragDiffX = subscribe(dragDiffX, (value) => $dragDiffX = value);
  $$unsubscribe_selectedElementIds = subscribe(selectedElementIds, (value) => $selectedElementIds = value);
  $$unsubscribe_isDragging = subscribe(isDragging, (value) => $isDragging = value);
  let { elementData } = $$props;
  let isHovered = false;
  let gridRef;
  let guidesRef;
  if ($$props.elementData === void 0 && $$bindings.elementData && elementData !== void 0)
    $$bindings.elementData(elementData);
  ({ type, id } = elementData);
  isSelected = $selectedElementIds.includes(id);
  gridElementData = getGridElementsPositions({
    elementData,
    isDragging: $isDragging,
    selectedElementIds: $selectedElementIds,
    diffX: $dragDiffX,
    diffY: $dragDiffY,
    device: $deviceKey,
    resizeDirection: $resizeDirection
  });
  ({ gridCssVars, elementCssVars } = type === ELEMENT_TYPES$1.GRID && getGridVars(gridElementData));
  {
    {
      const isInPath = $mouseMoveComposedPath.includes(gridRef);
      if (!isInPath && isHovered) {
        isHovered = false;
      } else if (isInPath && !isHovered) {
        isHovered = true;
        if ($isInserting) {
          const { clientX, clientY } = $mouseMoveEvent;
          const { left, top } = guidesRef?.getBoundingClientRect();
          initialMousePosition.set({ x: clientX, y: clientY });
          const x = clientX - left - 150;
          const y = clientY - top - 24;
          insertingElement.update((elementData2) => {
            return {
              ...elementData2,
              [$deviceKey]: { ...elementData2[$deviceKey], x, y }
            };
          });
          selectedElementIds.set([$insertingElement?.id]);
          isDragging.set(true);
        }
      }
    }
  }
  $$unsubscribe_insertingElement();
  $$unsubscribe_deviceKey();
  $$unsubscribe_mouseMoveEvent();
  $$unsubscribe_isInserting();
  $$unsubscribe_mouseMoveComposedPath();
  $$unsubscribe_resizeDirection();
  $$unsubscribe_dragDiffY();
  $$unsubscribe_dragDiffX();
  $$unsubscribe_selectedElementIds();
  $$unsubscribe_isDragging();
  return `${type === ELEMENT_TYPES$1.GRID ? `<div class="${"plane group/plane"}"${add_attribute("style", gridCssVars, 0)}${add_attribute("this", gridRef, 0)}>${each(gridElementData.children, (childElementData, i) => {
    return `<div class="${"element group/element"}"${add_attribute("style", elementCssVars[i], 0)}>${validate_component(BuilderElement, "svelte:self").$$render($$result, { elementData: childElementData }, {}, {})}
            </div>`;
  })}

        <div class="${[
    "opacity-0 pointer-events-none grid [grid-area:2/2/-2/-2] overflow-hidden",
    isHovered ? "opacity-100" : ""
  ].join(" ").trim()}"${add_attribute("this", guidesRef, 0)}>${validate_component(ElementControls, "ElementControls").$$render($$result, { elementData }, {}, {})}
            ${validate_component(Guides, "Guides").$$render($$result, { elementData: gridElementData }, {}, {})}</div>
        ${validate_component(SideOvershoots, "SideOvershoots").$$render($$result, { elementData: gridElementData, isHovered }, {}, {})}</div>` : `${type === ELEMENT_TYPES$1.TEXT ? `${validate_component(BuilderText, "BuilderText").$$render($$result, { elementData }, {}, {})}` : `${type === ELEMENT_TYPES$1.IMAGE ? `` : ``}`}`}

${isSelected && type !== ELEMENT_TYPES$1.GRID ? `${validate_component(ElementControls, "ElementControls").$$render($$result, { elementData }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isDragging, $$unsubscribe_isDragging;
  let $isInserting, $$unsubscribe_isInserting;
  let $selectedElementIds, $$unsubscribe_selectedElementIds;
  let $$unsubscribe_isShiftPressed;
  let $$unsubscribe_refStore;
  let $$unsubscribe_resizeDirection;
  let $$unsubscribe_dragDiffY;
  let $$unsubscribe_dragDiffX;
  let $$unsubscribe_insertingElement;
  let $$unsubscribe_hasDragged;
  let $$unsubscribe_isDragInserting;
  let $$unsubscribe_isClickInserting;
  let $currentPageData, $$unsubscribe_currentPageData;
  $$unsubscribe_isDragging = subscribe(isDragging, (value) => $isDragging = value);
  $$unsubscribe_isInserting = subscribe(isInserting, (value) => $isInserting = value);
  $$unsubscribe_selectedElementIds = subscribe(selectedElementIds, (value) => $selectedElementIds = value);
  $$unsubscribe_isShiftPressed = subscribe(isShiftPressed, (value) => value);
  $$unsubscribe_refStore = subscribe(refStore, (value) => value);
  $$unsubscribe_resizeDirection = subscribe(resizeDirection, (value) => value);
  $$unsubscribe_dragDiffY = subscribe(dragDiffY, (value) => value);
  $$unsubscribe_dragDiffX = subscribe(dragDiffX, (value) => value);
  $$unsubscribe_insertingElement = subscribe(insertingElement, (value) => value);
  $$unsubscribe_hasDragged = subscribe(hasDragged, (value) => value);
  $$unsubscribe_isDragInserting = subscribe(isDragInserting, (value) => value);
  $$unsubscribe_isClickInserting = subscribe(isClickInserting, (value) => value);
  $$unsubscribe_currentPageData = subscribe(currentPageData, (value) => $currentPageData = value);
  {
    {
      $selectedElementIds && !$isInserting && !$isDragging && recalculatePositions();
    }
  }
  $$unsubscribe_isDragging();
  $$unsubscribe_isInserting();
  $$unsubscribe_selectedElementIds();
  $$unsubscribe_isShiftPressed();
  $$unsubscribe_refStore();
  $$unsubscribe_resizeDirection();
  $$unsubscribe_dragDiffY();
  $$unsubscribe_dragDiffX();
  $$unsubscribe_insertingElement();
  $$unsubscribe_hasDragged();
  $$unsubscribe_isDragInserting();
  $$unsubscribe_isClickInserting();
  $$unsubscribe_currentPageData();
  return `

<main class="${"min-h-screen bg-gray-100"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
  ${each($currentPageData.children, (elementData) => {
    return `${validate_component(BuilderElement, "BuilderElement").$$render($$result, { elementData }, {}, {})}`;
  })}</main>`;
});
export {
  Page as default
};
