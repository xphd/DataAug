/*
getIdByLabel, using "wikibase-sdk" package, search the ids given items name 
*/

const axios = require("axios");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org", // not used
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});

function getIdByLabel(label, keyWord, store, fullfill, reject) {
  // let keyWord = store.keyWord;
  let label_qid = store.label_qid;
  // let qid_label = store.qid_label;
  let items = store.items;
  const sparqlQuery = `SELECT distinct ?item ?itemLabel ?itemDescription WHERE{  
    ?item ?label "${label}"@en.      
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } } `;
  /**
  SELECT distinct ?item ?itemLabel ?itemDescription WHERE{  
    ?item ?label "The Dark Knight"@en.      
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } }
 */
  const url = wbk.sparqlQuery(sparqlQuery);
  axios
    .get(url)
    .then(response => {
      let qid = "";
      let itemLabel = "";
      // let itemDescription = "";
      let bindings = response["data"]["results"]["bindings"];
      bindings.forEach(binding => {
        itemDescription = binding["itemDescription"];
        if (itemDescription) {
          let value = itemDescription["value"];
          if (value.includes(keyWord)) {
            let uri = binding["item"]["value"];
            let index = uri.lastIndexOf("/");
            qid = uri.substring(index + 1);
          }
          itemLabel = binding["itemLabel"]["value"];
        }
      });
      label_qid[label] = qid;
      // qid_label[qid] = label;
      if (qid) {
        items[qid] = {
          label: itemLabel
          // description: itemDescription
        };
      } else {
        console.log("Null qid for:", label);
      }

      fullfill();
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = getIdByLabel;
