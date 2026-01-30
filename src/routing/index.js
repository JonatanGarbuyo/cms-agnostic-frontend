import { createRouteEngine } from "./router";
import { routes } from "./routes";

import { deriveParams } from "./lifecycle/deriveParams";
import { fetchContent } from "./lifecycle/fetchContent";
import { selectTemplate } from "./lifecycle/selectTemplate";

export const routeEngine = createRouteEngine();

routes.forEach((route) => routeEngine.registerRoute(route));

routeEngine //
	.lifecycle(deriveParams)
	.lifecycle(fetchContent)
	.lifecycle(selectTemplate);
