// get entity by id from wikidata. This will fetch everything for the id in wikidata

// https://github.com/maxlath/wikibase-sdk/blob/master/docs/get_entities.md#get-many-entities-by-ids

const store = require("./store.js");

const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});
const fetch = require("node-fetch");
const appRootPath = require("app-root-path");

const utilities = require(appRootPath + "/utilities");

function getRelatedAttributes(colmn_name) {
  // get item to search from csv
  let items = store.items;
  let csvFilePath = store.csvFilePath;

  let data = fs.readFileSync(csvFilePath, { encoding: "utf8" });
  let options = {
    delimiter: ",", // optional
    quote: '"' // optional
  };
  let objs = csvjson.toObject(data, options);
  objs.forEach(obj => {
    let col_name = obj[colmn_name];
    items.push(col_name);
  });

  // get id from name
  let items = store.items;
  let chain = Promise.resolve();
  items.forEach(item => {
    chain = chain.then(() => {
      return new Promise((fullfill, reject) => {
        wikiSearch(item, store, fullfill, reject);
      });
    });
  });
  chain.then(() => {
    // console.log("last chain");
    utilities.saveToTemp(store.items_ids, "items_ids");
  });
  //

  //

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
