const store = require("./store/store.js");
const utilities = require("./utilities");

utilities.preprocess(store);

const job1 = require("./task/job1");
// const job2 = require("./task/job2");
// const job3 = require("./task/job3");
// const job4 = require("./task/job4");
// const job5 = require("./task/job5");

go();

async function go() {
  console.log("Job 1 begin");
  await job1.search(store);
  console.log("Job 1 end");
  // console.log("Task 2 begin");
  // await job2.getProperty(store);
  // console.log("Task 2 end");
  // console.log("Task 3 begin");
  // await job3.loadPropertyLabel(store);
  // console.log("Task 3 end");
  // console.log("Task 4 begin");
  // await job4.getAllValue(store);
  // console.log("Task 4 end");
  // console.log("Task 5 begin");
  // await job5.translate(store);
  // console.log("Task 5 end");
}
