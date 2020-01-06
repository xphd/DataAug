const fs = require("fs");
const csvjson = require("csvjson");
const appRootPath = require("app-root-path");

const store = require("../store/store.js");
const utilities = require("../utilities");

const job1 = require("../task/job1");
const job2 = require("../task/job2");
const job3 = require("../task/job3");
const job4 = require("../task/job4");
const job5 = require("../task/job5");

// input: column_name - a string corresponding to a column name in a dataset that is being looked at in d3m.  The backend will have to translate this to a wikidata "entity_type" (instance_of 'movie', the Q146 in the following SPARQL)

// output:joinableAttributes: A JSON object where the keys are the features of the passed in dataset, and the values are collections of joinable attributes.
async function getRelatedAttributes(column_name) {
  store.col_selected = column_name;
  utilities.preprocess(store);

  console.log("Job 1 begin");
  await job1.search(store);
  console.log("Job 1 end");

  console.log("Task 2 begin");
  await job2.getItemEntities(store);
  console.log("Task 2 end");

  // go();
  const PATH = appRootPath + "/temp/itemEntities.json";
  let jsonContent = fs.readFileSync(PATH);
  let itemEntities = JSON.parse(jsonContent);
  let attributes = retriveAttributes(itemEntities);

  console.log(attributes);

  return attributes;
}

function retriveAttributes(entitiesObj) {
  let entities = Object.values(entitiesObj);
  let firstEntity = entities[0];
  let claims = firstEntity["claims"];
  let attributes = {};
  for (let [key, value] of Object.entries(claims)) {
    attributes[key] = { type: "collection", validOps: ["count", "join"] };
  }
  return attributes;
}

// async function go() {
//   console.log("Job 1 begin");
//   await job1.search(store);
//   console.log("Job 1 end");

//   console.log("Task 2 begin");
//   await job2.getItemEntities(store);
//   console.log("Task 2 end");

// }

module.exports = getRelatedAttributes;
