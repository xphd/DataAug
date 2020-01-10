const fs = require("fs");
const csvjson = require("csvjson");

function preprocess(store) {
  let labels = store.labels;
  let inputFilePath = store.inputFilePath;
  let col_selected = store.col_selected;

  console.log("======> preprocess begin");
  if (!store.isDev) {
    lables = [];
    console.log("Read from:", inputFilePath);
    let data = fs.readFileSync(inputFilePath, { encoding: "utf8" });
    let options = {
      delimiter: ",", // optional
      quote: '"' // optional
    };
    let objs = csvjson.toObject(data, options);
    objs.forEach(obj => {
      let col_name = obj[col_selected];
      labels.push(col_name);
    });
  }
  console.log(store.labels);
  console.log("preprocess end <======");
}

module.exports = preprocess;
