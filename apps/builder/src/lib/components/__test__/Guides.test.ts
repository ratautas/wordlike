import { describe, it, expect } from "vitest";
import { ELEMENT_TYPES } from "$lib/constants";

import { getGuideMap } from "../Guides.svelte";

describe("getGuideMap", () => {
  it("should return a guide map", () => {
    const guideMap = getGuideMap({
      isDragging: true,
      isInserting: false,
      selectedElementData: {
        type: ELEMENT_TYPES.GRID,
      },
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rowArray: [0],
      columnArray: [0],
      columnWidth: 0,
      rowHeight: 0,
      gap: 0,
    });

    expect(guideMap).toEqual([[false]]);
  });
});