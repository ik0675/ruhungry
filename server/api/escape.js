const escape = (val) => {
  if (typeof val === 'string') {
    return val.replace('\'', '&apos;');
  }
  return val;
}

const unescape = (val) => {
  if (typeof val === 'string') {
    return val.replace('&apos;', '\'');
  }
  return val;
}

module.exports = {
  escape,
  unescape
}
