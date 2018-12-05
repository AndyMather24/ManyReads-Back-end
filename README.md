## Northcoders Back end Poject - Many Reads
 
Fullstack news gathering platform. Articles can be posted, voted on or discussed. The site is hosted through Heroku using MLabs for the database.

This project aims to demonstrate some of the skills learnt in four weeks of back end study including:

JavaScript programming
building a RESTful Web API to respond to HTTP requests
storing data and interacting with databases
Test Driven Development
NodeJS - https://nodejs.org/en/
supertest - https://www.npmjs.com/package/supertest
ExpressJS - https://expressjs.com/
Mocha - https://mochajs.org/
Mongoose - https://mongoosejs.com/
Using Comic News - Backend

A working example of this API is published at 


Endpoints
The API provides JSON responses to HTTP request methods relating to Articles, Comments, Topics and Users as described on the API.

Articles
Articles may be retrieved or added using the appropriate GET or POST HTTP method.

It's possible to retrieve all articles or articles filtered by topic.

Comments may be posted to an article on this endpoint.

Comments
Comment votes may be incremented or decremented using a PATCH method.

A comment may be deleted using DELETE.

Topics
Topics may be retrieved or added using the appropriate GET or POST method.

Users
Access to every user can be retrieved from this endpoint as well as a single user object.

Errors
Bad route, request and database errors result in the relevant 400/500 response headers and an error message in the JSON response body.

Express's next() method is used to handle errors.

Seeding Functions

Running locally

Fork & clone this repo, ensure you have the following  installed:
Node.js 10.6.0
MongoDB 3.4.17

Inside this the directory, install the required NPM packages:

$ npm install 
Seed the Database
Before seeding the database, ensure you have MongoDB running. In a separate CLI instance run the command:

$ mongod
Data is stored in the ./seed/devData directory in JSON format. To seed your database with this data, run this command in your project CLI:

$ npm run seed:dev

Run Application
Run the the following command in the CLI:

npm run dev
View Endpoints
API endpoints can be viewed on the following link: https://nc-news-andy.herokuapp.com/api/

To see an example of the the data returned make a GET request to 
https://nc-news-andy.herokuapp.com/api/articles

The /api/articles endpoint will return a JSON object with an array of article objects in this format:

{
  "articles": [
   {
"_id":"5c03f3f0d13fd65a3380ef97",
"votes":12,
"title":"Running a Node App",
"created_by":"5c03f3f0d13fd65a3380ef96",
"body":"This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
"created_at":"2016-08-18T12:07:52.389Z",
"belongs_to":"coding",
"__v":0,
"comment_count":8
}
  ]
}
Running the Tests
Automated tests for each endpoint are located in ./spec/spec.js.

To run test use the following command:

$npm run test

End to End Testing
Tests use SuperTest, Mocha and Chai for assertion based testing.

All use test use a test data set which located in ./seed/testData

Endpoints in a RESTful API must respond to HTTP verbs in the correct manner. The tests in this project therefore:

validate that data is retrieved or amended as appropriate to the controller and HTTP request method
data is returned in the correct JSON format
correct HTTP status codes are attached to the response header
error messages are returned where required
Built With
Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine
Express.js - Web Framework for Node.js, used to create a robust API
MongoDB - Database
Mongoose - Object Modelling for Node and Mongo DB
Mocha - JavaScript test framework
Chai - Asserion based testing for Mocha
Supertest - HTTP assertion testing agent

Authors
Andrew Mather
