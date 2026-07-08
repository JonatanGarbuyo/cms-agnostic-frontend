import { createRouteContext } from "./routeContext";
import { RouteNotFound } from "./errors";

export function createRouteEngine() {
	const routes = [];
	const lifecycleSteps = [];

	return {
		registerRoute(route) {
			if (!route.pattern || typeof route.pattern !== "string") {
				throw new Error("route.pattern string is required");
			}

			// https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
			route.urlPattern = new URLPattern({
				pathname: route.pattern,
				// search //  no usar search, requiere match exatco de params
			});
			routes.push(route);
			return this;
		},

		lifecycle(step) {
			if (typeof step !== "function") {
				throw new TypeError("lifecycle step must be a function");
			}

			lifecycleSteps.push(step);
			return this;
		},

		async resolve(url) {
			let routeContext = createRouteContext({ url });

			for (const route of routes) {
				const patternResult = route.urlPattern.exec({
					pathname: url.pathname,
				});

				const areConstraintsMet = (route.urlParams ?? []).every(
					({ key, required, value }) => !required || value === url.searchParams.get(key),
				);

				if (!patternResult || !areConstraintsMet) continue;

				routeContext.route = route;
				routeContext.patternResult = patternResult;
				break;
			}

			if (!routeContext.route) {
				throw new RouteNotFound({
					pathname: url.pathname,
				});
			}

			for (const step of lifecycleSteps) {
				const nextRouteContext = await step(routeContext);

				if (!nextRouteContext) {
					throw new Error(
						`Lifecycle step "${step.name || "anonymous"}" did not return routeContext`,
					);
				}

				routeContext = nextRouteContext;
			}

			return routeContext;
		},
	};
}
