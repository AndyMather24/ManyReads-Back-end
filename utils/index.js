exports.adjustArticles = (data, docs) => {
  // loop over array of obj
  const adjustedArts = data.map(obj => {
    // add prop of slug that refs a slug?
    return { ...obj, belongs_to: obj.topic };
  });
  return adjustedArts;
};
