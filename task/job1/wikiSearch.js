const rp = require("request-promise");
let apiHost = "www.wikidata.org";
let apiPath = "/w/api.php";
let searchAction = "wbsearchentities";
let language = "en";
let limit = 7;
let type = "item";

function wikiSearch(store, item, fullfill, reject) {
  let key_word = store.key_word;
  let map = store.map_item_to_id;

  let prefix = apiHost + apiPath + "?action=" + searchAction + "&format=json";
  let middle = "&language=" + language + "&type=" + type + "&limit=" + limit;
  let suffix = "&search=" + encodeURIComponent(item);
  let combinedUri = "https://" + prefix + middle + suffix;

  console.log(combinedUri);
  let requestOptions = {
    uri: combinedUri,
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
      map.set(item, id);
      fullfill();
    })
    .catch(function(err) {
      // API call failed...
      reject(err);
    });
}

module.exports = wikiSearch;
