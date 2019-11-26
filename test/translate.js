const itemEntities = require("./itemEntities.json");

let entities = Object.values(itemEntities);

let setQ = new Set();
let setP = new Set();

let q = "Q11424";
console.log(q.startsWith("Q"));

entities.forEach(entity => {
  let claims = entity["claims"];
  let properties = Object.keys(claims);
  console.log("propertities.length", properties.length);
  properties.forEach(p => {
    setP.add(p);
  });

  let items_array = Object.values(claims);
  items_array.forEach(items => {
    items.forEach(item => {
      //   console.log("item is", item);
      //   console.log(typeof item);

      if (typeof item === "string" && item.startsWith("Q")) {
        setQ.add(item);
      }
    });
  });
});

// console.log("setP.size", setP.size);
// console.log("setQ.size", setQ.size);

let arrayP = Array.from(setP);
// console.log(arrayP);

//

const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql"
});
const fetch = require("node-fetch");
const appRootPath = require("app-root-path");

const urls = wbk.getManyEntities({
  ids: arrayP,
  languages: ["en"],
  props: ["info", "labels", "claims"],
  format: "json",
  redirections: false // defaults to true
});

let chain = Promise.resolve();
urls.forEach(url => {
  // console.log("url");
  chain = chain.then(() => {
    console.log("chain");
    return new Promise((fullfill, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(wbk.parse.wd.entities)
        .then(entitiesObj => {
          // for (let [key, value] of Object.entries(entitiesObj)) {
          //   itemEntities[key] = value;
          // }
          console.log(entitiesObj);
          fullfill();
        });
    });
  });
});
// chain.then(() => {
//   utilities.saveToTemp(itemEntities, name);
// });

// const utilities = require(appRootPath + "/utilities");

// function getEntitiesByIds(ids, name) {
//   // each element of urls contains multiple (50 at most) ids
//   const urls = wbk.getManyEntities({
//     ids: ids,
//     languages: ["en"],
//     props: ["info", "labels", "claims"],
//     format: "json",
//     redirections: false // defaults to true
//   });

//   let itemEntities = {};
//   let chain = Promise.resolve();
//   urls.forEach(url => {
//     // console.log("url");
//     chain = chain.then(() => {
//       console.log("chain");
//       return new Promise((fullfill, reject) => {
//         fetch(url)
//           .then(response => response.json())
//           .then(wbk.parse.wd.entities)
//           .then(entitiesObj => {
//             for (let [key, value] of Object.entries(entitiesObj)) {
//               itemEntities[key] = value;
//             }
//             fullfill();
//           });
//       });
//     });
//   });
//   chain.then(() => {
//     utilities.saveToTemp(itemEntities, name);
//   });
//   return chain;
// }
