process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const seedDb = require('../seed/seed');
const { userData, articlesData, commentData, topicsData } = require('../seed/testData');

describe('/api', () => {
  beforeEach(() => {
    return seedDb(topicsData, userData, articlesData, commentData).then(docs => {
      return ([topicDocs, userDocs, artDocs, commentDocs] = docs);
    });
  });
  after(() => {
    mongoose.disconnect();
  });
  describe('/incorrecturl', () => {
    it('returns a 404 when endpoint does not exist', () => {
      return request.get('/api/thisisntacorrecturl').expect(404);
    });
  });

  describe('/topics', () => {
    it('get request to topics return 200 and arr of length of two', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.have.lengthOf(2);
        });
    });
  });
  describe('/articles', () => {
    it('get request to articles return 200 and arr of length of two', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.have.lengthOf(4);
        });
    });
  });
  describe('/topics/:topic_slug/articles', () => {
    it('get request to articles return 200 and arr of length of two', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.have.lengthOf(2);
          expect(res.body.articles[0]).to.keys(['__v', '_id', 'belongs_to', 'body', 'created_at', 'created_by', 'title', 'votes']);
        });
    });
  });
});
