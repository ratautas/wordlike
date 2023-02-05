export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-d1f30b2e.js","imports":["_app/immutable/start-d1f30b2e.js","_app/immutable/chunks/index-932b5f3a.js","_app/immutable/chunks/singletons-fa90fae2.js","_app/immutable/chunks/supabase-4de9858b.js","_app/immutable/chunks/browser-ponyfill-10e9505f.js","_app/immutable/chunks/parse-b67c4dc9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/builder",
				pattern: /^\/builder\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/logout/_server.ts.js')
			},
			{
				id: "/manage",
				pattern: /^\/manage\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/manage/sites",
				pattern: /^\/manage\/sites\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/public/[siteId]",
				pattern: /^\/public\/([^/]+?)\/?$/,
				params: [{"name":"siteId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/public/_siteId_/_server.ts.js')
			},
			{
				id: "/realtime",
				pattern: /^\/realtime\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/site/[siteId]",
				pattern: /^\/site\/([^/]+?)\/?$/,
				params: [{"name":"siteId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
