const fs = require("fs");
const appRootPath = require("app-root-path");

const getCommonPropertyLabels = require("./getCommonPropertyLabels");
// const getPidByLabel = require("../job3/getPidByLabel.js/index.js");
const PATH = appRootPath + "/temp/items.json";

async function getProperty(store) {
  let jsonContent = fs.readFileSync(PATH);
  let items = JSON.parse(jsonContent);
  store.items = items;
  let qids = Object.keys(items);
  // console.log(qids);
  let chain = getCommonPropertyLabels(qids);
  return chain;
}

module.exports = getProperty;
