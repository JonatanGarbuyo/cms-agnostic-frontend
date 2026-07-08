import { contentResolver } from "../../content-sources/resolver/content-resolver";

export async function fetchContent(routeContext) {
	if (!routeContext.route.content.source) return;

	routeContext.content = await contentResolver({
		source: routeContext.route.content.source,
		params: routeContext.contentParams,
	});

	return routeContext;
}
