// given a list of qids, find their common properties,
// properties exclude those containing "ID"

// const appRootPath = require("app-root-path");
const axios = require("axios");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org", // not used
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});
const appRootPath = require("app-root-path");
const utilities = require(appRootPath + "/utilities");
function getCommonProperties(qids) {
  // console.log(qids);
  // let qid_property = store.qid_property;
  let qid_property = {}; // key is qid, value is all properties returned by sparql
  let chain = Promise.resolve();
  for (let i = 0; i < qids.length; i++) {
    let qid = qids[i];
    // check if id is null, just in case
    if (qid.length < 1) {
      console.log("id is EMPTY!!!");
      continue;
    }
    const sparql = `SELECT DISTINCT ?wdLabel WHERE {   
      VALUES (?company) {(wd:${qid})}
      ?company ?p ?statement .
      ?wd wikibase:claim ?p.
      OPTIONAL {
        ?statement ?pq ?pq_ .
        ?wdpq wikibase:qualifier ?pq .
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    } ORDER BY ?wd ?statement ?ps_`;
    /**
    SELECT DISTINCT ?wdLabel WHERE {   
      VALUES (?company) {(wd:Q163872)}
      ?company ?p ?statement .
      ?wd wikibase:claim ?p.
      OPTIONAL {
        ?statement ?pq ?pq_ .
        ?wdpq wikibase:qualifier ?pq .
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    } ORDER BY ?wd ?statement ?ps_
     */
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
              // exclude properties which has "ID"
              if (!value.includes("ID")) {
                values.push(value);
              }
            });
            qid_property[qid] = values;

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
    // console.log(object);
    result = Object.values(object).reduce((a, b) =>
      b.filter(Set.prototype.has, new Set(a))
    );
    // result maybe [] !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let commonPropertyLabels = result;
    utilities.saveToTemp(qid_property, "qid_property");
    utilities.saveToTemp(commonPropertyLabels, "commonPropertyLabels");
    // console.log(result);
  });
  return chain;
}

module.exports = getCommonProperties;
