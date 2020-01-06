/*
"search" is to create a promise chain
and finally save the items_ids to static in /temp
*/

const appRootPath = require("app-root-path");
const utilities = require(appRootPath + "/utilities");
const wikiSearch = require("./wikiSearch.js");

function search(store) {
  let items = store.items;
  let chain = Promise.resolve();
  items.forEach(item => {
    chain = chain.then(() => {
      return new Promise((fullfill, reject) => {
        wikiSearch(item, store, fullfill, reject);
      });
    });
  });
  chain.then(() => {
    // console.log("last chain");
    utilities.saveToTemp(store.items_ids, "items_ids");
  });
  return chain;
}
module.exports = search;
