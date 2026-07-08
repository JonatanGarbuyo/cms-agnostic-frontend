const SOURCES = import.meta.glob("../*.js");

const moduleCache = new Map();

export async function loadSourceByFilename(filename) {
	if (typeof filename !== "string" || !filename) return null;

	const normalized = filename.endsWith(".js") ? filename : `${filename}.js`;

	const path = `../${normalized}`;

	if (moduleCache.has(path)) {
		return moduleCache.get(path);
	}

	const loader = SOURCES[path];
	if (!loader) {
		throw new Error(
			`Source not found: ${normalized}\nAvailable:\n${Object.keys(SOURCES).join("\n")}`,
		);
	}

	const module = await loader();
	const source = module.default;

	moduleCache.set(path, source);
	return source;
}

export async function contentResolver({ source = "", params = {} }) {
	if (typeof source !== "string" || !source) {
		return null;
	}

	const contentSource = await loadSourceByFilename(source);

	if (!contentSource || typeof contentSource.fetch !== "function") {
		throw new Error(`Invalid content source: ${source}`);
	}

	return await contentSource.fetch(params);
}
