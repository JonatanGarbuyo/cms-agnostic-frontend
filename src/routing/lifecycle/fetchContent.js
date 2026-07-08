import { contentResolver } from "../../content-sources/resolver/content-resolver";

export async function fetchContent(context) {
	if (!context.route.content.source) return;

	context.content = await contentResolver({
		source: context.route.content.source,
		params: context.contentParams,
	});

	return context;
}
