const fetch = require("node-fetch");

const wbk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql"
});

function isId(id) {
  return /^(Q|P|L)[1-9][0-9]*$/.test(id);
}

console.log(isId("Qq"));

// const url = wbk.searchEntities("Ingmar Bergman");

// console.log(url);

// const url = wbk.getEntities({
//   ids: ["Qqwqeqwr"],
//   languages: ["en"], // returns all languages if not specified
//   props: ["info", "claims", "labels"], // returns all data if not specified
//   format: "json", // defaults to json
//   redirections: false // defaults to true
// });

// console.log(url);

// const url = wbk.getEntities({
//   ids: ["Q647268", "Q771376", "Q860998", "Q965704"],
//   languages: ["en"]
// });
// console.log(url);

// let ids = [];
// for (let i = 1; i < 52; i++) {
//   ids.push("Q" + i);
// }
// console.log(ids);

// each url of urls has 50 ids

// const urls = wbk.getManyEntities({
//   ids: ["Q163872", "Q104123", "Q172241"],
//   languages: ["en"],
//   props: ["info", "labels", "claims"],
//   format: "json",
//   redirections: false // defaults to true
// });

// let urls = [
//   "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q163872%7CQ104123&format=json&languages=en&props=info%7Clabels%7Cclaims",
//   "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q172241&format=json&languages=en&props=info%7Clabels%7Cclaims"
// ];

// console.log(urls);

// fetch(urls[0])
//   .then(response => response.json())
//   .then(wbk.parse.wd.entities)
//   .then(entitiesObj => {
//     // do your thing with those entities data
//     let entities = Object.values(entitiesObj);
//     console.log(entities);
//   });

// let chain = Promise.resolve();
// urls.forEach(url => {
//   chain = chain.then(() => {
//     fetch(url)
//       .then(response => response.json())
//       .then(wbk.parse.wd.entities)
//       .then(
//         entities => console.log(entities) // do your thing with those entities data
//       );
//   });
// });

// let chain = Promise.resolve();
// urls.forEach(url => {
//   console.log(url);

//   chain = chain.then(() => {
//     console.log("chain");
//     return new Promise((fullfill, reject) => {
//       fetch(url)
//         .then(response => response.json())
//         .then(wbk.parse.wd.entities)
//         .then(entitiesObj => {
//           for (let [key, value] of Object.entries(entitiesObj)) {
//           }
//           let entities = Object.values(entitiesObj);
//           entities.forEach(entity => {
//             // console.log(entity["id"]);
//             console.log(entity);
//           });
//           // console.log(entities); // do your thing with those entities data
//           // console.log("entities");
//           fullfill();
//         });
//     });
//   });
// });

// chain.then(() => {
//   console.log("work done");
// });
