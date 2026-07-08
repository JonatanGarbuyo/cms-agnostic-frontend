export function selectTemplate(routeContext) {
	const { templates } = routeContext.route;
	let resolved = templates.default;

	if (templates.variants) {
		for (const variant of templates.variants) {
			const { field, eq } = variant.when;
			if (routeContext.content?.[field] === eq) {
				resolved = variant.use;
				break;
			}
		}
	}

	routeContext.template = resolved;
	return routeContext;
}
