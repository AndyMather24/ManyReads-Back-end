exports.formatArticles = (data, docs) => {
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

exports.formatComments = (data, userDocs, artDocs) => {
  // map over array of objs
  const adjustedComs = data.map(obj => {
    // find matching user from user docs array
    let matchingUserDoc = userDocs.find(doc => {
      return doc.username === obj.created_by;
    });
    let matchingArtDoc = artDocs.find(doc => {
      return doc.title === obj.belongs_to;
    });

    return { ...obj, created_by: matchingUserDoc._id, belongs_to: matchingArtDoc._id };
  });
  return adjustedComs;
};
