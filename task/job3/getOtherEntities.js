const job2 = require("../job2");

function getOtherEntities(entitiesObj, property, name) {
  let entities = Object.values(entitiesObj);

  let property_values_set = new Set();

  entities.forEach(entity => {
    let claims = entity["claims"];
    if (claims[property]) {
      // let values = claims[property]["values"];
      let values = claims[property];
      // values[0]["datatype"]
      values.forEach(value => {
        // property_values_set.add(value["value"]);
        property_values_set.add(value);
      });
    }
  });

  // legacy
  // entities.forEach(entity => {
  //   let claims = entity["claims"];
  //   if (claims[property]) {
  //     let values = claims[property]["values"];
  //     // values[0]["datatype"]
  //     values.forEach(value => {
  //       property_values_set.add(value["value"]);
  //     });
  //   }
  // });

  let ids = Array.from(property_values_set);
  console.log("ids are: ", ids);

  let promise = job2.getEntitiesByIds(ids, name);
  return promise;
}

module.exports = getOtherEntities;
