class RouteEngineError extends Error {
	constructor(message, details = {}) {
		super(message);
		this.name = this.constructor.name;
		this.details = details;
	}
}

export class RouteNotFound extends RouteEngineError {
	code = "ROUTE_NOT_FOUND";

	constructor(details) {
		super("Route not found", details);
	}
}

export class ContentNotFound extends RouteEngineError {
	code = "CONTENT_NOT_FOUND";

	constructor(details) {
		super("Content not found", details);
	}
}

export class ContentSourceError extends RouteEngineError {
	code = "CONTENT_SOURCE_ERROR";

	constructor(details) {
		super("Content source error", details);
		this.cause = details?.cause;
	}
}

export class TemplateNotFound extends RouteEngineError {
	code = "TEMPLATE_NOT_FOUND";

	constructor(details) {
		super("Template not found", details);
	}
}
