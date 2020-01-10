/*
"search" is to create a promise chain
and finally save the items_ids to static in /temp
*/

const appRootPath = require("app-root-path");

const getIdByLabel = require("./getIdByLabel.js");
const utilities = require(appRootPath + "/utilities");

function search(store) {
  let labels = store.labels;
  let chain = Promise.resolve();
  labels.forEach(label => {
    chain = chain.then(() => {
      return new Promise((fullfill, reject) => {
        getIdByLabel(label, store, fullfill, reject);
      });
    });
  });
  chain.then(() => {
    // console.log("last chain");
    utilities.saveToTemp(store.label_qid, "label_qid");
    utilities.saveToTemp(store.qid_label, "qid_label");
    utilities.saveToTemp(store.items, "items");
  });
  return chain;
}
module.exports = search;
