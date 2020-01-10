// central, hub, bus, shared variables
const store = {
  // col_selected: "title",
  key_word: "film", // could be used to filter searching results

  items: ["The Dark Knight", "Pulp Fiction", "The Shawshank Redemption"], // [], names to search, obtained from the input CSV file

  labels_ids: {}, // {}, results from task 1, map items to wiki-ids

  ids_entities: {}, //new Map(), // results from task 2

  ids_properties: {},

  map_propertyId_to_entityIds: new Map(), // results from task 3

  csvFilePath: "./input/imdb_10.csv",
  //   originalData: null,
  headers: null,
  selectColumn: null
};

module.exports = store;
