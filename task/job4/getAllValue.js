const fs = require("fs");
const appRootPath = require("app-root-path");

const itemPATH = appRootPath + "/temp/items.json";

const propertyPATH = appRootPath + "/temp/commonProperties.json";

const property_pid = require(appRootPath + "/temp/property_pid.json");

const utilities = require(appRootPath + "/utilities");

const getValue = require("./getValue.js");

function getAllValue(store) {
  let jsonContentItem = fs.readFileSync(itemPATH);
  let items = JSON.parse(jsonContentItem);
  store.items = items;

  let jsonContentProperty = fs.readFileSync(propertyPATH);
  let propertyLabels = JSON.parse(jsonContentProperty);

  let qids = Object.keys(items);
  let pids = [];
  propertyLabels.forEach(label => {
    let pid = property_pid[label];
    // console.log(pid);
    pids.push(pid);
  });
  //   console.log(pids);
  let chain = Promise.resolve();
  for (let i = 0; i < qids.length; i++) {
    let qid = qids[i];
    // console.log(qid);
    for (let j = 0; j < pids.length; j++) {
      let pid = pids[j];
      //   console.log(pid);
      chain = chain.then(() => {
        return new Promise((fullfill, reject) => {
          getValue(qid, pid, store, fullfill, reject);
        });
      });
    }
  }
  chain.then(() => {
    utilities.saveToTemp(store.items, "items");
  });
  return chain;
}
module.exports = getAllValue;
