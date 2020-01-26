const fs = require("fs");
const appRootPath = require("app-root-path");

const getPidByLabel = require("./getPidByLabel.js");
const utilities = require(appRootPath + "/utilities");
const PATH = appRootPath + "/temp/commonPropertyLabels.json";
function getPidsByLabels(store) {
  let jsonContent = fs.readFileSync(PATH);
  let commonPropertyLabels = JSON.parse(jsonContent);

  let chain = Promise.resolve();

  //   console.log(commonProperties);
  for (let i = 0; i < commonPropertyLabels.length; i++) {
    let propertyLabel = commonPropertyLabels[i];
    chain = chain.then(() => {
      return new Promise((fullfill, reject) => {
        getPidByLabel(propertyLabel, store, fullfill, reject);
      });
    });
  }

  chain.then(() => {
    // utilities.saveToTemp(store.property_pid, "property_pid");
    utilities.saveToTemp(store.pid_property, "pid_property");
  });
  return chain;
}
module.exports = getPidsByLabels;
