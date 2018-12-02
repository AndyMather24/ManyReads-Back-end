exports.getHomepage = (req, res) => {
  const homepageObj = { routes: ['/', '/topics', '/articles', '/articles/:article_id', '/articles/:article_id/comments', '/comments/:comment_id', '/users/:username'] };
  res.send(homepageObj);
};
