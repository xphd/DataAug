const fs = require("fs");
const csvjson = require("csvjson");

function preprocess(store) {
  let items = store.items;
  let csvFilePath = store.csvFilePath;
  let col_selected = store.col_selected;

  console.log("======> preprocess begin");
  if (!store.isDev) {
    let data = fs.readFileSync(csvFilePath, { encoding: "utf8" });
    let options = {
      delimiter: ",", // optional
      quote: '"' // optional
    };
    let objs = csvjson.toObject(data, options);
    objs.forEach(obj => {
      let col_name = obj[col_selected];
      items.push(col_name);
    });
  }
  console.log(store.items);
  console.log("preprocess end <======");
}

module.exports = preprocess;
