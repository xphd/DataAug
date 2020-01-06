// get entity by id from wikidata. This will fetch everything for the id in wikidata

// https://github.com/maxlath/wikibase-sdk/blob/master/docs/get_entities.md#get-many-entities-by-ids

const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql"
});
const fetch = require("node-fetch");
const appRootPath = require("app-root-path");

const utilities = require(appRootPath + "/utilities");

function getEntitiesByIds(ids, name) {
  // each element of urls contains multiple (50 at most) ids
  const urls = wbk.getManyEntities({
    ids: ids,
    languages: ["en"],
    props: ["info", "labels", "claims"],
    format: "json",
    redirections: false // defaults to true
  });
  console.log(urls);

  let itemEntities = {};
  let chain = Promise.resolve();
  urls.forEach(url => {
    console.log("url", url);
    chain = chain.then(() => {
      console.log("chain");
      return new Promise((fullfill, reject) => {
        fetch(url)
          .then(response => response.json())
          .then(wbk.parse.wd.entities)
          .then(entitiesObj => {
            for (let [key, value] of Object.entries(entitiesObj)) {
              itemEntities[key] = value;
            }
            fullfill();
          });
      });
    });
  });
  chain.then(() => {
    utilities.saveToTemp(itemEntities, name);
  });
  return chain;
}
module.exports = getEntitiesByIds;
