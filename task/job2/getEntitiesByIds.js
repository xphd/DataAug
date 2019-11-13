// get entity by id from wikidata. This will fetch everything for the id in wikidata

// NOTE: there seem to be a limit of number of ids like 200?
import { getEntities } from "wiki-entity";

const appRootPath = require("app-root-path");
const utilities = require(appRootPath + "/utilities");

function getEntitiesByIds(ids, name) {
  // let ids = null;
  // if (store.testJob2) {
  //   ids = ["Q163872", "Q104123", "Q172241"];
  // } else {
  //   let map = store.map_item_to_id;
  //   for (let [item, id] of map.entries()) {
  //     ids.push(id); // ids length less than 500
  //   }
  // }
  // let main_entities = store.main_entities;
  let itemEntities = {};
  let promise = new Promise((fullfill, reject) => {
    getEntities({ language: "en", ids }).then(entities => {
      entities.forEach(entity => {
        delete entity["sitelinks"];
        let id = entity["id"];
        // map_id_to_entity.set(id, entity);
        itemEntities[id] = entity;
      });
      // console.log(map_id_to_entity);
      utilities.saveToTemp(itemEntities, name);
      fullfill();
    });
  });
  return promise;
}
module.exports = getEntitiesByIds;
