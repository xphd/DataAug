// give a list of qids, find their common properties

// const appRootPath = require("app-root-path");
const axios = require("axios");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org", // not used
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});
const appRootPath = require("app-root-path");
const utilities = require(appRootPath + "/utilities");
function getCommonProperties(qids, store) {
  // console.log(qids);
  let qid_property = store.qid_property;
  let chain = Promise.resolve();
  for (let i = 0; i < qids.length; i++) {
    let id = qids[i];
    if (id.length < 1) {
      console.log("id is EMPTY!!!", id);
      continue;
    }
    const sparql = `
    SELECT DISTINCT ?wdLabel WHERE {   
      VALUES (?company) {(wd:${id})}
      ?company ?p ?statement .
      ?wd wikibase:claim ?p.
      OPTIONAL {
        ?statement ?pq ?pq_ .
        ?wdpq wikibase:qualifier ?pq .
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    } ORDER BY ?wd ?statement ?ps_
    `;
    const url = wbk.sparqlQuery(sparql);
    chain = chain.then(() => {
      return new Promise((fullfill, reject) => {
        axios
          .get(url)
          .then(response => {
            let bindings = response["data"]["results"]["bindings"];
            let values = [];
            bindings.forEach(binding => {
              let value = binding["wdLabel"]["value"];
              if (!value.includes("ID")) {
                values.push(value);
              }
            });
            qid_property[id] = values;

            fullfill();
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  }
  chain.then(() => {
    var object = qid_property;
    console.log(object);
    result = Object.values(object).reduce((a, b) =>
      b.filter(Set.prototype.has, new Set(a))
    );
    // result maybe [] !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    store.commonProperties = result;
    utilities.saveToTemp(store.commonProperties, "commonProperties");
    // console.log(result);
  });
}

module.exports = getCommonProperties;
