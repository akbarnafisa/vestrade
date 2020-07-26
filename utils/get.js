export const get = (obj, nestedProp, def) => {
  if (!obj || !nestedProp) {
    return def;
  }

  const rxAccess = new RegExp(`[\\[\\]\\.]+`);
  const props = nestedProp.split(rxAccess).filter(Boolean);

  let curr = obj;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (i === props.length - 1) {
      return curr[prop] === undefined ? def : curr[prop];
    }
    if (!curr[prop]) {
      return def;
    }
    curr = curr[prop];
  }

  return curr === undefined ? def : curr;
};
