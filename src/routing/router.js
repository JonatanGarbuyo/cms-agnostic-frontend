import { createRouteContext } from "./context";
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
			const context = createRouteContext({ url });

			for (const route of routes) {
				const patternResult = route.urlPattern.exec({
					pathname: url.pathname,
				});

				const areConstraintsMet = (route.urlParams ?? []).every(
					({ key, required, value }) => !required || value === url.searchParams.get(key),
				);
				// console.log(">>> MATCH", { patternResult, areConstraintsMet }); ////////

				if (!patternResult || !areConstraintsMet) continue;

				context.route = route;
				context.patternResult = patternResult;
				break;
			}

			if (!context.route) {
				throw new RouteNotFound();
			}

			for (const step of lifecycleSteps) {
				await step(context);
			}

			return context;
		},
	};
}
