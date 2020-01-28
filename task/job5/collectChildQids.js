function collectChildQids(parentEntities, pid) {
  let childQidSet = new Set();
  let parentQids = Object.keys(parentEntities);
  parentQids.forEach(parentQid => {
    let childQids = entities[parentQid][pid]["value"];
    childQids.forEach(childQid => {
      childQidSet.add(childQid);
    });
  });
}
