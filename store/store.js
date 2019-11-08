// central, hub, bus, shared variables
const store = {
  isDev: true,
  testJob1: false,
  testJob2: true,
  testJob3: false,

  col_selected: "title",

  items: null, // names used in wikidata search

  key_word: "film", // could be used to filter searching results

  map_item_to_id: new Map(), // results from task 1

  map_id_to_entity: new Map(), // results from task 2

  map_propertyId_to_entityIds: new Map(), // results from task 3

  csvFilePath: "./input/imdb_10.csv",
  //   originalData: null,
  headers: null,
  selectColumn: null
};

module.exports = store;
