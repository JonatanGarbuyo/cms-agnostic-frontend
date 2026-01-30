export function deriveParams(context) {
  const contentParams = {};

  for (const param of context.route.content.params) {
    switch (param.from) {
      case "pattern":
        contentParams[param.key] =
          context.patternResult.pathname.groups[param.value];
        break;

      case "parameter":
        contentParams[param.key] = context.url.searchParams.get(param.value);
        break;

      case "static":
        contentParams[param.key] = param.value;
        break;
    }
  }

  context.contentParams = contentParams;
  return context;
}
