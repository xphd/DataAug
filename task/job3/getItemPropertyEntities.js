const getOtherEntities = require("./getOtherEntities.js");
const appRootPath = require("app-root-path");
const PATH = appRootPath + "/temp/itemEntities.json";

function getItemPropertyEntities(store) {
  const itemEntitiesObj = require(PATH);

  let property = "P161"; // hardcoded now. This shoud be selected by user

  let name = "P161";
  let promise = getOtherEntities(itemEntitiesObj, property, name);
  return promise;
}
module.exports = getItemPropertyEntities;
