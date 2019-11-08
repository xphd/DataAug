// get entity by id from wikidata. This will fetch everything for the id in wikidata

// NOTE: there seem to be a limit of number of ids like 200?
import { getEntities } from "wiki-entity";

const appRootPath = require("app-root-path");
const utilities = require(appRootPath + "/utilities");

function getEntitiesByIds(store) {
  let ids = null;
  if (store.testJob2) {
    ids = ["Q163872", "Q104123", "Q172241"];
  } else {
    let map = store.map_item_to_id;
    for (let [item, id] of map.entries()) {
      ids.push(id); // ids length less than 500
    }
  }
  let map_id_to_entity = store.map_id_to_entity;
  let promise = new Promise((fullfill, reject) => {
    getEntities({ language: "en", ids }).then(entities => {
      entities.forEach(entity => {
        let id = entity["id"];
        map_id_to_entity.set(id, entity);
      });
      // console.log(map_id_to_entity);
      utilities.saveToTemp(store.map_id_to_entity, "id_to_entity");
      fullfill();
    });
  });
  return promise;
}
module.exports = getEntitiesByIds;
