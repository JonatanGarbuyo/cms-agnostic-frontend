export default function articleViewModel(routeContext) {
	const content = routeContext.content;

	const slug = content.slug ?? "";
	const siteDomain = "http://localhost:4321"; // site prop?
	const articleUrl = new URL(slug, siteDomain);

	const headline = content.title ?? "";
	const description = content.subtitle || content.description || "";

	return {
		articleUrl,
		description,
		headline,
	};
}
