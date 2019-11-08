const fs = require("fs");
const appRootPath = require("app-root-path");
// save dynamic variable like map to "/temp" folder as json file or like

function saveToTemp(map, name) {
  let path = appRootPath + "/temp/" + name + ".json";
  let obj = {};

  for (let [key, value] of map.entries()) {
    obj[key] = value;
  }

  let jsonContent = JSON.stringify(obj);
  //   console.log(jsonContent);

  fs.writeFile(path, jsonContent, "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
}
module.exports = saveToTemp;
