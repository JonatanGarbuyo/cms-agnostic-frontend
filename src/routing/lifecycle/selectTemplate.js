export function selectTemplate(context) {
	const { templates } = context.route;
	let resolved = templates.default;

	if (templates.variants) {
		for (const variant of templates.variants) {
			const { field, eq } = variant.when;
			if (context.content?.[field] === eq) {
				resolved = variant.use;
				break;
			}
		}
	}

	context.template = resolved;
}
