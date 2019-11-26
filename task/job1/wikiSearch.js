const rp = require("request-promise");
const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql"
});

// const language = "en"; // will default to 'en'
// const limit = 5; // defaults to 20
// const format = "json"; // defaults to json

function wikiSearch(store, item, fullfill, reject) {
  let key_word = store.key_word;
  let items_ids = store.items_ids;

  // let search = item;
  // const url = wbk.searchEntities(search, language, limit, format);
  let url = wbk.searchEntities(item, "en", 5, "json");
  console.log(url);

  let requestOptions = {
    uri: url,
    method: "GET",
    json: true
  };

  rp(requestOptions)
    .then(function(response) {
      let results = response["search"];
      let id = "";
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        // console.log(result);
        let description = result["description"];
        // console.log("description", description);
        if (description && description.includes(key_word)) {
          id = result["id"];
          // console.log("description", description);
          break;
        }
      }
      // let id = response["search"][0]["id"];
      // console.log(id);
      // map.set(item, id);
      items_ids[item] = id;
      fullfill();
    })
    .catch(function(err) {
      // API call failed...
      reject(err);
    });
}

module.exports = wikiSearch;
