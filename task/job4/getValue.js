const axios = require("axios");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org", // not used
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});

function getValue(qid, pid, store, fullfill, reject) {
  let items = store.items;
  // let qid = "Q163872";
  // let pid = "P161";
  let sparql = `
        SELECT ?value WHERE {
            wd:${qid} wdt:${pid} ?value 
        }
    `;
  const url = wbk.sparqlQuery(sparql);
  axios
    .get(url)
    .then(response => {
      //   console.log(response);
      //   let pid = "";
      let bindings = response["data"]["results"]["bindings"];
      //   console.log(bindings);
      let value_qids = [];
      bindings.forEach(binding => {
        let value = binding["value"];
        if (value) {
          let uri = value["value"];

          let index = uri.lastIndexOf("/");
          value_qid = uri.substring(index + 1);
          if (qid.startsWith("Q")) {
            // console.log(qid);
            value_qids.push(value_qid);
          }
        }
      });
      items[qid][pid] = value_qids;
      console.log(qid, pid, value_qids);
      fullfill();
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = getValue;
