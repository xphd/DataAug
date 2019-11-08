const fs = require("fs");
const csvjson = require("csvjson");

function preprocess(store) {
  let items = null;

  console.log("======> preprocess begin");
  let csvFilePath = store.csvFilePath;
  if (store.isDev) {
    items = ["The Dark Knight", "Pulp Fiction", "The Shawshank Redemption"];
  } else {
    // item = [];
    // let col_selected = store.col_selected;
    // let data = fs.readFileSync(csvFilePath, { encoding: "utf8" });
    // let options = {
    //   delimiter: ",", // optional
    //   quote: '"' // optional
    // };
    // let objs = csvjson.toObject(data, options);
    // // store.originalData = objs;
    // let objs = csvjson.toObject(data, options);
    // objs.forEach(obj => {
    //   let col_name = obj[col_selected];
    //   items.push(col_name);
    // });
  }
  //   console.log(store.originalData);
  store.items = items;
  console.log("preprocess end <======");
}

module.exports = preprocess;
