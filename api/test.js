const getRelatedAttributes = require("./getRelatedAttributes.js");

const store = require("../store/store.js");

let col_selected = store.col_selected;
let attributes = getRelatedAttributes(col_selected);

console.log("attributes:", attributes);
