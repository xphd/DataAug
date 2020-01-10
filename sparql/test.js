// Make sure you initialize wbk with a sparqlEndpoint
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  // sparqlEndpoint: "https://query.wikidata.org/sparql"
  sparqlEndpoint: "http://dsbox02.isi.edu:8888/bigdata/namespace/wdq/sparql"
});
// const fetch = require("node-fetch");
// const rp = require("request-promise");

let item = "The Dark Knight";

const sparql = `
SELECT distinct ?item ?itemLabel ?itemDescription WHERE{  
  ?item ?label "${item}"@en.   
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }    
}
  `;
const url = wbk.sparqlQuery(sparql);

console.log(url);

// let requestOptions = {
//   uri: url,
//   method: "GET"
//   // json: true
// };

// var request = require("request");
// request(url, { json: true }, function(error, response, body) {
//   console.log("error:", error); // Print the error if one occurred
//   console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//   console.log("body:", body); // Print the HTML for the Google homepage.
// });

const axios = require("axios");
let key_word = "film";
axios
  .get(url)
  .then(response => {
    // console.log(response);
    // console.log(response["data"]["results"]["bindings"]);
    let bindings = response["data"]["results"]["bindings"];
    bindings.forEach(binding => {
      let itemDescription = binding["itemDescription"];
      if (itemDescription) {
        let value = itemDescription["value"];
        // console.log(value);
        if (value.includes(key_word)) {
          let uri = binding["item"]["value"];
          let index = uri.lastIndexOf("/");
          let qid = uri.substring(index + 1);
          console.log(qid);
        }
      } else {
        // console.log("null itemDescription");
      }
    });

    // console.log(response.data.url);
    // console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
