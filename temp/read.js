// let actorsObj = require("./P161.json");

// let actors = Object.values(actorsObj);

// console.log(actors.length);

// let itemEntitiesObj = require("./itemEntities.json");

// itemEntities = Object.values(itemEntitiesObj);

// let sum = 0;
// let set = new Set();
// itemEntities.forEach(entity => {
//   //   let len = entity["claims"]["P161"]["values"].length;
//   //   sum += len;
//   //   console.log(len);
//   let values = entity["claims"]["P161"]["values"];
//   values.forEach(value => {
//     set.add(value["value"]);
//   });
// });
// console.log(set.size);

let awardsObj = require("./P161_P166.json");

let awards = Object.values(awardsObj);

let sum = 0;
let set = new Set();
itemEntities.forEach(entity => {
  //   let len = entity["claims"]["P161"]["values"].length;
  //   sum += len;
  //   console.log(len);
  let values = entity["claims"]["P161"]["values"];
  values.forEach(value => {
    set.add(value["value"]);
  });
});
console.log(set.size);
