const appRootPath = require("app-root-path");
const utilities = require(appRootPath + "/utilities");
const wikiSearch = require("./wikiSearch.js");

function search(store) {
  let items = store.items;
  let chain = Promise.resolve();
  items.forEach(name => {
    chain = chain.then(() => {
      return new Promise((fullfill, reject) => {
        wikiSearch(store, name, fullfill, reject);
      });
    });
  });
  chain.then(() => {
    utilities.saveToTemp(store.map_item_to_id, "item_to_id");
  });
  return chain;
}
module.exports = search;
