export const routes = [
	{
		name: "ARTICLE",
		pattern: "/:sectionPath*/:yyyy(\\d{4})/:mm(\\d{2})/:dd(\\d{2})/:slug{/}?",
		urlParams: [
			// { key: "outputType", value: "amp", required: true }
		],
		content: {
			source: "content-api",
			params: [
				// from:  "parameter" |  "pattern" | "static"
				{ key: "slug", from: "pattern", value: "slug" },
				// { key: "slug", from: "parameter", value: "outputType" },
				// { key: "slug", from: "static", value: "messi" },
			],
		},
		templates: {
			default: "article",
			variants: [{ when: { field: "subtype", eq: "video" }, use: "article-video" }],
		},
	},
	{
		name: "ARTICLE-AMP",
		pattern: "/:sectionPath*/:yyyy(\\d{4})/:mm(\\d{2})/:dd(\\d{2})/:slug{/}?",
		urlParams: [{ key: "outputType", value: "amp", required: true }],
		content: {
			source: "content-api",
			params: [
				// from:  "parameter" |  "pattern" | "static"
				{ key: "slug", from: "pattern", value: "slug" },
				// { key: "slug", from: "parameter", value: "outputType" },
				// { key: "slug", from: "static", value: "messi" },
			],
		},
		templates: {
			default: "article-amp",
			variants: [{ when: { field: "subtype", eq: "video" }, use: "article-amp-video" }],
		},
	},
];
