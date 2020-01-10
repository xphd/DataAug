// central, hub, bus, shared variables
const store = {
  isDev: false,
  testJob1: false,
  testJob2: true,
  testJob3: false,

  col_selected: "title",

  key_word: "film", // could be used to filter searching results

  labels: ["The Dark Knight", "Pulp Fiction", "The Shawshank Redemption"], // [], names to search, obtained from the input CSV file

  label_qid: {}, // {}, results from task 1, map items to wiki-ids
  //
  commonProperties: [],
  property_pid: {},

  qid_label: {},
  pid_property: {},

  qid_property: {},

  items: {},

  inputFilePath: "./input/imdb_10.csv",
  //   originalData: null,
  headers: null,
  selectColumn: null
};

module.exports = store;
