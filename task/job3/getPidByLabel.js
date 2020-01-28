const axios = require("axios");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org", // not used
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});

// const appRootPath = require("app-root-path");

function getPidByLabel(propertyLabel, store, fullfill, reject) {
  // console.log(propertyLabel);
  let pid_property = store.pid_property;
  let property_pid = store.property_pid;
  // let propertyLabel = "based on";

  const sparql = `
      SELECT distinct ?item ?itemLabel ?itemDescription WHERE{  
        ?item ?label "${propertyLabel}"@en.      
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }    
      }
      `;
  const url = wbk.sparqlQuery(sparql);
  // console.log(url);
  axios
    .get(url)
    .then(response => {
      let bindings = response["data"]["results"]["bindings"];
      console.log(propertyLabel);
      // console.log(bindings);
      bindings.forEach(binding => {
        let itemDescription = binding["itemLabel"];
        if (itemDescription) {
          let value = itemDescription["value"];
          if (value.includes(propertyLabel)) {
            let uri = binding["item"]["value"];
            let index = uri.lastIndexOf("/");
            let pid = uri.substring(index + 1);
            if (pid.startsWith("P")) {
              console.log(pid);
              pid_property[pid] = propertyLabel;
              property_pid[propertyLabel] = pid;
            }
          }
        }
      });
      //   items_ids[item] = qid;
      fullfill();
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = getPidByLabel;
