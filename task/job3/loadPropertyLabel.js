const fs = require("fs");
const appRootPath = require("app-root-path");

const getPropertyId = require("./getPropertyId.js");
const utilities = require(appRootPath + "/utilities");
const PATH = appRootPath + "/temp/commonProperties.json";
function loadPropertyLabel(store) {
  let jsonContent = fs.readFileSync(PATH);
  let commonProperties = JSON.parse(jsonContent);

  let chain = Promise.resolve();

  //   console.log(commonProperties);
  for (let i = 0; i < commonProperties.length; i++) {
    let propertyLabel = commonProperties[i];
    chain = chain.then(() => {
      return new Promise((fullfill, reject) => {
        getPropertyId(propertyLabel, store, fullfill, reject);
      });
    });
  }

  chain.then(() => {
    utilities.saveToTemp(store.property_pid, "property_pid");
    utilities.saveToTemp(store.pid_property, "pid_property");
  });
  return chain;
}
module.exports = loadPropertyLabel;
