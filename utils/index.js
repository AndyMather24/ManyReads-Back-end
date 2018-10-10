exports.adjustArticles = (data, docs) => {
  // map over array of objs
  const adjustedArts = data.map(obj => {
    // find matching user from user docs array
    const matchingDoc = docs.find(doc => {
      return doc.username === obj.created_by;
    });
    return { ...obj, created_by: matchingDoc._id, belongs_to: obj.topic };
  });
  return adjustedArts;
};
