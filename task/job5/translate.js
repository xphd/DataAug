const appRootPath = require("app-root-path");

function translate() {
  let filenames = ["itemEntities.json", "P161.json"];

  let setP = new Set();
  let setQ = new Set();

  filenames.forEach(filename => {
    // console.log(filename);
    let entitiesObj = require(appRootPath + "/temp/" + filename);
    // console.log(entitiesObj);
    let entities = Object.values(entitiesObj);
    entities.forEach(entity => {
      let claims = entity["claims"];
      console.log(claims);
      let properties = Object.keys(claims);
      console.log(properties);
      console.log("propertities.length", properties.length);
      properties.forEach(p => {
        setP.add(p);
      });

      let items_array = Object.values(claims);
      items_array.forEach(items => {
        items.forEach(item => {
          //   console.log("item is", item);
          //   console.log(typeof item);

          if (typeof item === "string" && /^(Q|P|L)[1-9][0-9]*$/.test(item)) {
            setQ.add(item);
          }
        });
      });
    });
  });

  let arrayP = Array.from(setP);
  let arrayQ = Array.from(setQ);
  console.log("arrayQ.length:", arrayQ.length);

  const wbk = require("wikibase-sdk")({
    instance: "https://www.wikidata.org",
    sparqlEndpoint: "https://query.wikidata.org/sparql"
  });
  const fetch = require("node-fetch");

  const utilities = require(appRootPath + "/utilities");

  //   const urlsP = wbk.getManyEntities({
  //     ids: arrayP,
  //     languages: ["en"],
  //     props: ["info", "labels", "claims"],
  //     format: "json",
  //     redirections: false // defaults to true
  //   });

  //   let chainP = Promise.resolve();
  //   let pid_label = {};
  //   urlsP.forEach(url => {
  //     // console.log("url");
  //     chainP = chainP.then(() => {
  //       console.log("chain");
  //       return new Promise((fullfill, reject) => {
  //         fetch(url)
  //           .then(response => response.json())
  //           .then(wbk.parse.wd.entities)
  //           .then(entitiesObj => {
  //             for (let [key, value] of Object.entries(entitiesObj)) {
  //               pid_label[key] = value["labels"]["en"];
  //             }
  //             // console.log(entitiesObj);
  //             fullfill();
  //           });
  //       });
  //     });
  //   });
  //   chainP.then(() => {
  //     utilities.saveToTemp(pid_label, "pid_label");
  //   });

  const urlsQ = wbk.getManyEntities({
    ids: arrayQ,
    languages: ["en"],
    props: ["info", "labels", "claims"],
    format: "json",
    redirections: false // defaults to true
  });

  let chainQ = Promise.resolve();
  let qid_label = {};
  urlsQ.forEach(url => {
    // console.log("url");
    chainQ = chainQ.then(() => {
      //   console.log("chain");
      return new Promise((fullfill, reject) => {
        fetch(url)
          .then(response => response.json())
          .then(wbk.parse.wd.entities)
          .then(entitiesObj => {
            for (let [key, value] of Object.entries(entitiesObj)) {
              qid_label[key] = value["labels"]["en"];
            }
            console.log(Object.keys(qid_label).length);
            // console.log(entitiesObj);
            fullfill();
          });
      });
    });
  });
  chainQ.then(() => {
    utilities.saveToTemp(qid_label, "qid_label");
  });
}
module.exports = translate;
