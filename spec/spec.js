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
          expect(res.body).to.have.lengthOf(2);
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
    it('POST returns a status 201 and a article object containing the new article', () => {
      return request
        .post('/api/topics/mitch/articles')
        .send({
          title: 'new article',
          body: 'This is my new article content',
          created_by: `${userDocs._id}`
        })
        .expect(201);
    });
  });
  // article testing
  describe('/articles', () => {
    it('get request to articles return 200 and arr of length of two', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.lengthOf(4);
        });
    });
  });
  describe('/articles/:article_id', () => {
    it('return  single article when passed an valid id & status 200', () => {
      return request
        .get(`/api/articles/${artDocs._id}`)
        .expect(200)
        .then(res => {
          expect(res.body._id).to.equal(`${artDocs._id}`);
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
    it('patch returns 200 and updated vote up count', () => {
      return request
        .patch(`/api/articles/${artDocs._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.votes).to.be.equal(1);
        });
    });
    it('patch returns 200 and updated vote down count', () => {
      return request
        .patch(`/api/articles/${artDocs._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.votes).to.be.equal(-1);
        });
    });
  });
  describe('/articles/:article_id/comments', () => {
    it('POST returns a status 201 and a comment body with id of user that added', () => {
      return request
        .post(`/api/articles/${artDocs._id}/comments`)
        .send({
          body: 'This is a new comment',
          created_by: `${userDocs._id}`
        })
        .expect(201);
    });
  });
  //user testing
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

  // comments testing

  describe('articles/:article_id/comments', () => {
    it('return all comments for article matching id when given a valid id & status 200', () => {
      return request
        .get(`/api/articles/${artDocs._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.have.length(2);
        });
    });
  });

  describe('/comments/:comment_id', () => {
    it('DELETE returns a status 200 and removed the house', () => {
      return request
        .delete(`/api/comments/${commentDocs._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.msg).to.equal(`comment ${commentDocs._id} deleted `);
        });
    });
    it('add vote and returns status 200', () => {
      return request
        .patch(`/api/comment/${commentDocs._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.votes).to.be.equal(1);
        });
    });
  });
});
