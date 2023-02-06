[x] merge Block and BlockElement
[x] move handle refs to global refs
[x] split handles to separate components
[x] update resize horizontal
[x] update grid element handles
[x] add snap to sides
[x] add grid guides
[x] auto update element width / height on content change
[x] move with keyboard arrows
[x] disable tailwind reset
[x] improve snap to sides UX
[x] astro
[ ] cleanup components
[x] move only tailwind resets to Astro
[ ] add more text types
[ ] block resize handles
[ ] store grid width to json
[ ] make elementMap to store references to the doc elemements
[ ] added elements should have predefined device data
[ ] snap to grid
[ ] figure out select text vs drag
[ ] drop on click insertion is not working correctly
[x] fix selecting multiple elements
[x] move schmeas to separate package
[ ] split nebula to:
- elements
- utils
- schema
[ ] round position before saving to json
[ ] fix most of the TypeScript issiues
[ ] tweak inserting new element
[ ] TipTap is blinking when clicked
[ ] add popup
[ ] background color + overlay
[ ] padding
[ ] border + radius
[ ] re-enable saving
[ ] local backend
[ ] add functionalty to de-snap from side
[ ] add alignment between elements guides
[ ] tiptap
[ ] partytown
[ ] mobile
[ ] preview
[ ] add grid guides config
[ ] allow going out of bounds
[ ] validate data before sending to backend (zod?)
[ ] add type definitions
[ ] move element to another grid
[ ] image
[ ] add some parallax
[ ] zoom
[ ] reveal animation
[ ] rotate
[ ] skew/rotateX/rotateY
[ ] background video
[ ] draggable popup
[ ] undo/redo
[ ] GIF
[ ] REM scaling
[ ] custom code injection with highlight
[ ] select all elements within selected grid element
[ ] multiple gird variations - grid.studio, figma dots, vertical lines;
[ ] draggable popups;
[ ] allow input width/height manually via settings;

All elements can be links;
All elements can have a background color;
All elements can have a border;
All elements can have a shadow;

- Grid yra Astro arba Builder failas - kaip sharinami stiliai ir struktūra?
- Grid'e paskaičiuojamos grid'o pozicijos IR parenkami elementai
- Parenkami elementai gali būti tie patys su slot'ais arba tiesiog skirtingi pagal kontekstą


THEME VARIABLES:
- colors
- font sizes
- font families
- font weights
- font slants
- line heights?..
- letter spacing?..
- border radius

PRIMARY:
- preset + edit global + save selected as preset
- bold
- italic
- align
- font size
- color
- lists
- link
SECONDARY:
- element type
- font family
- underline
- strikethrough

ELEMENT:
- cut / copy / duplicate
- delete
- settings
- move to front / back
SETTINGS
- background color
- background image
- border
- border radius
- padding
- shadow
- opacity
- transform
- blur
- reveal
- parallax
- links/CTA
- desktop/mobiile