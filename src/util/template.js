import get from 'lodash/get';
const DEFAULT_OPTIONS = { regex: /{{([\s\S]+?)}}/g };

export default (str, context, options = DEFAULT_OPTIONS) => str.replace(
  options.regex,
  (_, prop) => get(context, prop)
);
