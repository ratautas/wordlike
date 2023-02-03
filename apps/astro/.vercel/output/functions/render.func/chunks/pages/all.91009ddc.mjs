/* empty css                             */import { c as E, a as C, r as g, m as R, b as _, d as x, e as V, f as X } from "../astro.e47c3358.mjs"; function G(t) { return t() } function N() { return Object.create(null) } function Y(t) { t.forEach(G) } function H(t, s, { bubbles: e = !1, cancelable: n = !1 } = {}) { const r = document.createEvent("CustomEvent"); return r.initCustomEvent(t, e, n, s), r } let T; function A(t) { T = t } function k() { if (!T) throw new Error("Function called outside component initialization"); return T } function M(t) { k().$$.on_destroy.push(t) } function P() { const t = k(); return (s, e, { cancelable: n = !1 } = {}) => { const r = t.$$.callbacks[s]; if (r) { const o = H(s, e, { cancelable: n }); return r.slice().forEach(i => { i.call(t, o) }), !o.defaultPrevented } return !0 } } Promise.resolve(); const U = /[&"]/g, B = /[&<]/g; function F(t, s = !1) { const e = String(t), n = s ? U : B; n.lastIndex = 0; let r = "", o = 0; for (; n.test(e);) { const i = n.lastIndex - 1, c = e[i]; r += e.substring(o, i) + (c === "&" ? "&amp;" : c === '"' ? "&quot;" : "&lt;"), o = i + 1 } return r + e.substring(o) } let y; function K(t) {
	function s(e, n, r, o, i) { const c = T, u = { on_destroy: y, context: new Map(i || (c ? c.$$.context : [])), on_mount: [], before_update: [], after_update: [], callbacks: N() }; A({ $$: u }); const m = t(e, n, r, o); return A(c), m } return {
		render: (e = {}, { $$slots: n = {}, context: r = new Map } = {}) => {
			y = []; const o = { title: "", head: "", css: new Set }, i = s(o, e, {}, n, r); return Y(y), {
				html: i, css: {
					code: Array.from(o.css).map(c => c.code).join(`
`), map: null
				}, head: o.title + o.head
			}
		}, $$render: s
	}
} function q(t, s, e) { if (s == null || e && !s) return ""; const n = e && s === !0 ? "" : `="${F(s, !0)}"`; return ` ${t}${n}` } const W = { code: ".text.svelte-b99giz{overflow-wrap:break-word}.text.svelte-b99giz h1{font-size:2rem;font-weight:700}.text.svelte-b99giz h2{font-size:1.5rem;font-weight:700}.text.svelte-b99giz h3{font-size:1.3rem;font-weight:700}.text.svelte-b99giz h4{font-size:1rem;font-weight:700}", map: null }, J = K((t, s, e, n) => {
	const r = P(); let { elementData: o } = s, i; return M(() => r("destroy")), s.elementData === void 0 && e.elementData && o !== void 0 && e.elementData(o), t.css.add(W), `<div class="text svelte-b99giz"${q("this", i, 0)}><!-- HTML_TAG_START -->${o?.html}<!-- HTML_TAG_END -->
</div>`}), Q = { DESKTOP: { key: "desktop", value: 1224 }, TABLET: { key: "tablet", value: 768 }, MOBILE: { key: "mobile", value: 375 } }, f = { desktop: { x: 0, y: 0, width: 100, height: 100, paddingX: 24, paddingY: 24 }, tablet: { x: 0, y: 0, width: 100, height: 100, paddingX: 24, paddingY: 24 }, mobile: { x: 0, y: 0, width: 100, height: 100, paddingX: 24, paddingY: 24 } }; function Z({ elementData: t, device: s }) { if (!t) return {}; const { rows: e, columns: n, positions: r } = t.children?.reduce((a, l) => { const { x: d, y: h, width: w, height: $, snapLeft: b, snapRight: v } = l[s] ?? f[s]; return a.columns.add(d), a.columns.add(d + w), a.rows.add(h), a.rows.add(h + $), a.positions.push({ x: d, y: h, width: w, height: $, snapLeft: b, snapRight: v }), a }, { rows: new Set([0]), columns: new Set([0, t[s]?.width ?? f[s].width]), positions: [] }), o = [...e].sort((a, l) => a - l), i = [...n].sort((a, l) => a - l), c = o[o.length - 1], u = r.map(a => { const { x: l, y: d, width: h, height: w, snapLeft: $, snapRight: b } = a, v = o.indexOf(d) + 2, I = o.indexOf(d + w) + 2, j = i.length, D = $ ? 1 : i.indexOf(l) + 2, L = b ? j + 2 : i.indexOf(l + h) + 2; return [v, D, I, L].join("/") }), { gridTemplateRows: m } = o.filter(a => a > 0).reduce((a, l) => { const d = l - a.previousRow; return { gridTemplateRows: [...a.gridTemplateRows, d], previousRow: a.previousRow + d } }, { gridTemplateRows: [], previousRow: 0 }), { gridTemplateColumns: p } = i.filter(a => a > 0).reduce((a, l) => { const d = l - a.previousColumn; return { gridTemplateColumns: [...a.gridTemplateColumns, d], previousColumn: a.previousColumn + d } }, { gridTemplateColumns: [], previousColumn: 0 }); return { gridAreas: u, gridHeight: c, gridTemplateRows: m, gridTemplateColumns: p } } function tt({ elementData: t, gridTemplateRows: s, device: e }) { return [t[e]?.paddingY ?? f[e].paddingY, ...s, t[e]?.paddingY ?? f[e].paddingY].map(n => `minmax(${n}px, 0fr)`).join(" ") } function et({ elementData: t, gridTemplateColumns: s, device: e }) { const n = t[e]?.paddingX ?? f[e].paddingX, r = t[e]?.width ?? f[e].width; return [`minmax(${n ?? 0}px, calc(50% - ${r / 2}px))`, ...s, `minmax(${n ?? 0}px, calc(50% - ${r / 2}px))`].map(o => isNaN(Number(o)) ? o : `${o / r}fr`).join(" ") } function nt(t) { return Object.values(Q).reduce((s, e) => { const n = e.key, { gridTemplateRows: r, gridTemplateColumns: o, gridAreas: i } = Z({ elementData: t, device: n }), c = tt({ elementData: t, gridTemplateRows: r, device: n }), u = et({ elementData: t, gridTemplateColumns: o, device: n }); return s.gridCssVars += `--${n}-rows: ${c}; --${n}-columns: ${u};`, i?.forEach((m, p) => { s.elementCssVars[p] ??= "", s.elementCssVars[p] += `--${n}-area: ${m};` }), s }, { gridCssVars: "", elementCssVars: [] }) } const st = E(), O = C(async (t, s, e) => {
		const n = t.createAstro(st, s, e); n.self = O; const { elementData: r } = n.props, { children: o, type: i } = r ?? {}, { gridCssVars: c, elementCssVars: u } = i === "GRID" && nt(r); return g`${i === "GRID" && g`${R(t)}<div class="plane"${_(c, "style")}>
            ${o.map((m, p) => g`<div class="element"${_(u[p], "style")}>
                    ${x(t, "Astro.self", n.self, { elementData: m })}
                </div>`)}
        </div>`}

${i === "TEXT" && g`${x(t, "Text", J, { elementData: r, "client:load": !0, "client:component-hydration": "load", "client:component-path": "@wordlike/nebula", "client:component-export": "Text" })}`}`
	}, "/Users/algirdastamasauskas/wordlike/apps/astro/src/components/AstroElement.astro"), ot = E(), S = C(async (t, s, e) => {
		const n = t.createAstro(ot, s, e); n.self = S; const { title: r } = n.props; return g`<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="generator"${_(n.generator, "content")}>
		<title>${r}</title>
	${V(t)}</head>
	<body>
		${X(t, e.default)}
	</body></html>`}, "/Users/algirdastamasauskas/wordlike/apps/astro/src/layouts/Layout.astro"), rt = E(), z = C(async (t, s, e) => {
			const n = t.createAstro(rt, s, e); n.self = z; const { params: r, url: o, redirect: i } = n, { slug: c } = r; let { siteId: u } = Object.fromEntries(o.searchParams); u || ([u] = o.hostname.split(".")); const m = await fetch(`https://wordlike-builder.vercel.app/public/${u}`), { pages: p } = await m.json(), a = p.find(l => l.isHome || l.slug === c); return a ? g`${x(t, "Layout", S, { title: "Welcome to Astro." }, {
				default: () => g`${R(t)}<main>
    ${a.children.map(l => g`${x(t, "AstroElement", O, { elementData: l })}`)}
  </main>`})}` : i("/404")
		}, "/Users/algirdastamasauskas/wordlike/apps/astro/src/pages/[...slug].astro"), at = "/Users/algirdastamasauskas/wordlike/apps/astro/src/pages/[...slug].astro", it = "/[...slug]", dt = Object.freeze(Object.defineProperty({ __proto__: null, default: z, file: at, url: it }, Symbol.toStringTag, { value: "Module" })); export { dt as _ };
