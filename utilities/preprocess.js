const fs = require("fs");
const csvjson = require("csvjson");

function preprocess(store, inputFilePath, columnSelected) {
  let itemLabels = store.itemLabels;
  // let inputFilePath = store.inputFilePath;
  // let col_selected = store.col_selected;

  console.log("======> preprocess begin");
  if (!store.isDev) {
    itemLabels = [];
    console.log("Read from:", inputFilePath);
    let data = fs.readFileSync(inputFilePath, { encoding: "utf8" });
    let options = {
      delimiter: ",", // optional
      quote: '"' // optional
    };
    let objs = csvjson.toObject(data, options);
    objs.forEach(obj => {
      let label = obj[columnSelected];
      itemLabels.push(label);
    });
    store.itemLabels = itemLabels;
  }
  console.log("preprocess end <======");
}

module.exports = preprocess;
