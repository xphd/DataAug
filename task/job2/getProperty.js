const fs = require("fs");
const appRootPath = require("app-root-path");

const getCommonProperties = require("./getCommonProperties");
const PATH = appRootPath + "/temp/items.json";

function getProperty(store) {
  let jsonContent = fs.readFileSync(PATH);
  let label_qid = JSON.parse(jsonContent);

  let qids = Object.keys(label_qid);
  // console.log(qids);
  getCommonProperties(qids, store);
}

module.exports = getProperty;
