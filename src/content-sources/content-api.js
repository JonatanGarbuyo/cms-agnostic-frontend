const CONTENT_BASE = import.meta.env.CONTENT_BASE;
const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

const params = [
	{ displayName: "id", name: "id", type: "text" },
	{ displayName: "slug", name: "slug", type: "text" },
];

const fetchArticle = async ({ id, slug }) => {
	const search = new URLSearchParams();
	let orIndex = 0;

	if (id) {
		search.set(`filters[$or][${orIndex}][id][$eq]`, id);
		orIndex++;
	}

	if (slug) {
		search.set(`filters[$or][${orIndex}][slug][$eq]`, slug);
		orIndex++;
	}

	if (orIndex === 0) {
		return null;
	}

	search.set("pagination[pageSize]", "1");
	search.set("populate[tags]", "true");
	search.set("populate[category]", "true");
	search.set("populate[author]", "true");
	search.set("populate[blocks][populate]", "*");
	search.set("sort[0]", "publishedAt:desc");

	try {
		const response = await globalThis.fetch(`${CONTENT_BASE}/api/articles?${search.toString()}`, {
			headers: {
				"content-type": "application/json; charset=utf-8",
				"Authorization": `Bearer ${ACCESS_TOKEN}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const { data } = await response.json();
		return data?.[0] ?? null;
	} catch (error) {
		console.error("[content-api]", error);
		return null;
	}
};

export default {
	fetch: fetchArticle,
	params,
	transform: (data) => data,
};
