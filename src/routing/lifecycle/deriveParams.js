export function deriveParams(routeContext) {
	const contentParams = {};

	for (const param of routeContext.route.content.params) {
		switch (param.from) {
			case "pattern":
				contentParams[param.key] = routeContext.patternResult.pathname.groups[param.value];
				break;

			case "parameter":
				contentParams[param.key] = routeContext.url.searchParams.get(param.value);
				break;

			case "static":
				contentParams[param.key] = param.value;
				break;
		}
	}

	routeContext.contentParams = contentParams;
	return routeContext;
}
