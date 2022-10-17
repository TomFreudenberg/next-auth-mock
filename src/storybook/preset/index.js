function config(entry = []) {
  return [...entry, require.resolve("./preview")];
}

function managerEntries(entry = []) {
  return [...entry];
}

module.exports = { managerEntries, config }
