import { contentResolver } from "../../content-sources/resolver/content-resolver";
import { ContentNotFound, ContentSourceError } from "../errors";

export async function fetchContent(routeContext) {
	if (!routeContext.route.content.source) return routeContext;

	try {
		routeContext.content = await contentResolver({
			source: routeContext.route.content.source,
			params: routeContext.contentParams,
		});
	} catch (error) {
		throw new ContentSourceError({
			cause: error,
			route: routeContext.route.name,
			source: routeContext.route.content.source,
			params: routeContext.contentParams,
		});
	}

	if (!routeContext.content) {
		throw new ContentNotFound({
			route: routeContext.route.name,
			source: routeContext.route.content.source,
			params: routeContext.contentParams,
		});
	}

	return routeContext;
}
