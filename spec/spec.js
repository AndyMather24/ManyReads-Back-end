process.env.NODE_ENV = 'test';
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
});
