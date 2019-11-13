const fs = require("fs");

let objs = { name: "alex", age: 16 };

// let jsonContent = fs.readFileSync("./items_ids.json");

// let items_ids = JSON.parse(jsonContent);

// console.log(items_ids["The Godfather"]);

let values = Object.values(objs);

console.log(values);
