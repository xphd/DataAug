/*
wikiSearch, using "wikibase-sda" package, search the ids given items name 
*/

const axios = require("axios");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org", // not used
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});

function wikiSearch(item, store, fullfill, reject) {
  let key_word = store.key_word;
  let items_ids = store.items_ids;

  const sparql = `
  SELECT distinct ?item ?itemLabel ?itemDescription WHERE{  
    ?item ?label "${item}"@en.      
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }    
  }
  `;

  const url = wbk.sparqlQuery(sparql);
  // console.log(url);

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
            // console.log(qid);
          }
        }
      });
      items_ids[item] = qid;
      fullfill();
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = wikiSearch;
