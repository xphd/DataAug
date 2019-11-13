// central, hub, bus, shared variables
const store = {
  isDev: false,
  testJob1: false,
  testJob2: true,
  testJob3: false,

  col_selected: "title",
  key_word: "film", // could be used to filter searching results

  items: null, // array, names used in wikidata search

  items_ids: {}, // {}, new Map(), // results from task 1

  ids_entities: {}, //new Map(), // results from task 2

  ids_properties: {},

  map_propertyId_to_entityIds: new Map(), // results from task 3

  csvFilePath: "./input/imdb_10.csv",
  //   originalData: null,
  headers: null,
  selectColumn: null
};

module.exports = store;
