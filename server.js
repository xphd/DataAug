const store = require("./store/store.js");
const utilities = require("./utilities");

// utilities.preprocess(store);

// const job1 = require("./task/job1");
// const job2 = require("./task/job2");
// const job3 = require("./task/job3");
const job4 = require("./task/job4");

go();

async function go() {
  // console.log("Job 1 begin");
  // await job1.search(store);
  // console.log("Job 1 end");

  // console.log("Task 2 begin");
  // await job2.getItemEntities(store);
  // console.log("Task 2 end");

  // console.log("Task 3 begin");
  // await job3.getItemPropertyEntities(store);
  // console.log("Task 3 end");

  console.log("Task 4 begin");
  await job4.generateNewProp(store);
  console.log("Task 4 end");
}
