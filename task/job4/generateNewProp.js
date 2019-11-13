const appRootPath = require("app-root-path");
const utilities = require(appRootPath + "/utilities");

function generateNewProp() {
  let rawOperations = "SUM_P161_COUNT_P166";
  let operations = rawOperations.split("_");

  let len = operations.length;
  for (let i = 0; i < len; i++) {
    let index = len - 1 - i;
    let op = operations[index];
    // console.log(op);
    if (op == "COUNT") {
      //   let entitiesName = getEntitiesName(operations, index);
      //   //   console.log("entitiesName", entitiesName);
      //   let propertyName = operations[index + 1];
      //   let entitiesObj = require(appRootPath + "/temp/" + entitiesName);
      //   op_count(entitiesObj, propertyName);
      //   utilities.saveToTemp(entitiesObj, entitiesName);
    } else if (op == "SUM") {
      let superordinate = "itemEntities";
      if (index > 0) {
        superordinate = getEntitiesName(operations, index - 1);
      }
      let subordinate = getEntitiesName(operations, index + 1);

      console.log("superordinate", superordinate);
      console.log("subordinate", subordinate);

      //   console.log("entitiesName", entitiesName);
      let propertyName = "";
      for (let i = 0; i + index + 2 < len; i++) {
        propertyName = propertyName + "_" + operations[i + index + 2];
        // console.log(propertyName);
      }
      propertyName = propertyName.substring(1);

      //   console.log("propertyName", propertyName);
      let superordinateObj = require(appRootPath +
        "/temp/" +
        superordinate +
        ".json");
      let subordinateObj = require(appRootPath +
        "/temp/" +
        subordinate +
        ".json");

      let superordinateEntities = Object.values(superordinateObj);
      superordinateEntities.forEach(entity => {
        // console.log(entity["label"]);
        // console.log(entity["claims"][subordinate]);
        let sum = 0;
        entity["claims"][subordinate]["values"].forEach(value => {
          let id = value["value"];
          //   console.log(subordinateObj[id]);
          //   console.log(subordinateObj[id]);
          //   console.log(subordinateObj[id][propertyName]);
          let count = subordinateObj[id][propertyName];
          sum += count;
        });
        let newPropName = getNewPropName(operations, index);
        // console.log(newPropName);

        entity[newPropName] = sum;
        // console.log(entity);
      });
      utilities.saveToTemp(superordinateObj, superordinate);
    }
  }
}

function getNewPropName(operations, index) {
  let newPropName = "";
  for (let i = index; i < operations.length; i++) {
    newPropName = newPropName + "_" + operations[i];
  }
  newPropName = newPropName.substring(1);
  return newPropName;
}

function op_sum(superEntitiesObj, subEntitiesObj, property) {}

function op_count(entitiesObj, property) {
  let entities = Object.values(entitiesObj);

  entities.forEach(entity => {
    let id = entity["id"];
    // console.log(property);
    // console.log("entity", entity["claims"][property]["values"]);
    console.log("entity,", entity["label"]);
    let count = 0;
    if (entity["claims"][property]) {
      count = entity["claims"][property]["values"].length;
    }

    let newProp = "COUNT_" + property;
    entity[newProp] = count;
    console.log(entity[newProp]);
    entitiesObj[id] = entity;
  });
}

function getEntitiesName(operations, index) {
  //   console.log(operations, index);
  let name = "";
  for (let i = 0; i < index + 1; i++) {
    let op = operations[i];
    // console.log(op);
    if (op.includes("P")) {
      name = name + "_" + op;
    }
  }

  name = name.substring(1);
  return name;
}

module.exports = generateNewProp;
