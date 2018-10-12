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
  // topics testing
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
  describe('/topics/:topic_slug/articles', () => {
    it('get request to articles return status 200 and arr of length of two and correct keys', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.have.lengthOf(2);
          //expect(res.body.articles).to.keys(['__v', '_id', 'belongs_to', 'body', 'created_at', 'created_by', 'title', 'votes']);
        });
    });
    it('get request with a param that does not exist returns status 404 & correct msg', () => {
      return request
        .get('/api/topics/turtles/articles')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Invalid Param');
        });
    });
  });
  // article testing
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
  describe('/articles/:article_id', () => {
    it('return  single article when passed an valid id & status 200', () => {
      return request
        .get(`/api/articles/${artDocs._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article._id).to.equal(`${artDocs._id}`);
        });
    });
    it('get request with a valid param that does not exist returns status 404 & correct msg', () => {
      return request
        .get(`/api/articles/${userDocs._id}`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Invalid Param');
        });
    });
  });
  // comments testing
  describe('/users/:username', () => {
    it('return single user info when passed an valid username & status 200', () => {
      return request
        .get(`/api/users/${userDocs.username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user.username).to.equal(`${userDocs.username}`);
        });
    });
  });

  //user testing
  describe('articles/:article_id/comments', () => {
    it('return all comments for article matching id when given a valid id & status 200', () => {
      return request.get(`/api/articles/${artDocs._id}/comments`).expect(200);
      // .then(res => {
      //   expect(res.body.comments.).to.equal(`${userDocs.username}`);
      // });
    });
  });
});
