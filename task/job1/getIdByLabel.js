/*
getIdByLabel, using "wikibase-sdk" package, search the ids given items name 
*/

const axios = require("axios");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org", // not used
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});

function getIdByLabel(label, store, fullfill, reject) {
  let key_word = store.key_word;
  let label_qid = store.label_qid;
  let qid_label = store.qid_label;
  let items = store.items;
  const sparqlQuery = `
  SELECT distinct ?item ?itemLabel ?itemDescription WHERE{  
    ?item ?label "${label}"@en.      
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } } 
  `;
  const url = wbk.sparqlQuery(sparqlQuery);
  axios
    .get(url)
    .then(response => {
      let qid = "";
      let bindings = response["data"]["results"]["bindings"];
      bindings.forEach(binding => {
        let itemDescription = binding["itemDescription"];
        if (itemDescription) {
          let value = itemDescription["value"];
          if (value.includes(key_word)) {
            let uri = binding["item"]["value"];
            let index = uri.lastIndexOf("/");
            qid = uri.substring(index + 1);
          }
        }
      });
      label_qid[label] = qid;
      qid_label[qid] = label;
      items[qid] = {};
      fullfill();
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = getIdByLabel;
