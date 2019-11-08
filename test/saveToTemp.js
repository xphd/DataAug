const fs = require("fs");
let map = new Map();

map.set("The Dark Knight", "Q123");
map.set("Pulp Fiction", "Q987");

let obj = {};

for (let [key, value] of map.entries()) {
  obj[key] = value;
}

let jsonContent = JSON.stringify(obj);
console.log(jsonContent);

fs.writeFile("output.json", jsonContent, "utf8", function(err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
});
