const fs = require("fs");
const csvjson = require("csvjson");

const store = require("../store/store.js");
const utilities = require("../utilities");

const job1 = require("../task/job1");
const job2 = require("../task/job2");
const job3 = require("../task/job3");
const job4 = require("../task/job4");
const job5 = require("../task/job5");

// input: column_name - a string corresponding to a column name in a dataset that is being looked at in d3m.  The backend will have to translate this to a wikidata "entity_type" (instance_of 'movie', the Q146 in the following SPARQL)

// output:joinableAttributes: A JSON object where the keys are the features of the passed in dataset, and the values are collections of joinable attributes.
function getRelatedAttributes(column_name) {
  utilities.preprocess(store);
  go();
}

async function go() {
  console.log("Job 1 begin");
  await job1.search(store);
  console.log("Job 1 end");
  console.log("Task 2 begin");
  await job2.getItemEntities(store);
  console.log("Task 2 end");
  console.log("Task 3 begin");
  await job3.getItemPropertyEntities(store);
  console.log("Task 3 end");
  console.log("Task 4 begin");
  await job4.generateNewProp(store);
  console.log("Task 4 end");
  console.log("Task 5 begin");
  await job5.translate(store);
  console.log("Task 5 end");
}

module.exports = getRelatedAttributes;
