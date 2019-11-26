const getEntitiesByIds = require("./getEntitiesByIds.js");
const fs = require("fs");
const appRootPath = require("app-root-path");
const PATH = appRootPath + "/temp/items_ids.json";
function getItemEntities(store) {
  let jsonContent = fs.readFileSync(PATH);
  let items_ids = JSON.parse(jsonContent);
  let ids = Object.values(items_ids);
  let promise = getEntitiesByIds(ids, "itemEntities");
  return promise;
}

module.exports = getItemEntities;
