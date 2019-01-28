function toCamel(str) {
  let reg1 = /"\w+":/g;
  let reg2 = /_([a-zA-Z0-9]{1})/g;
  return str.replace(reg1, function() {
    return arguments[0].replace(reg2, function() {
      if (/[a-z]/.test(arguments[1])) {
        return arguments[1].toUpperCase();
      } else {
        return arguments[1];
      }
    });
  });
}
function toUnderline(str) {
  let reg1 = /"\w+":/g;
  let reg2 = /([A-Z]{1})/g;
  return str.replace(reg1, function() {
    return arguments[0].replace(reg2, function() {
      return `_${arguments[1].toLowerCase()}`;
    });
  });
}

export { toCamel, toUnderline };
