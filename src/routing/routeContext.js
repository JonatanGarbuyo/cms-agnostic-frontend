export function createRouteContext({ url }) {
	return {
		content: null,
		contentParams: null,
		route: null,
		template: null,
		url,
	};
}
