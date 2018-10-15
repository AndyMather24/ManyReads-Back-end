let env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    DB_URL: 'mongodb://localhost:27017/Ncnews'
  },
  test: {
    DB_URL: 'mongodb://localhost:27017/Ncnewstest'
  },
  production: {
    DB_URL: 'mongodb://andymather:qwerty12345@ds131743.mlab.com:31743/nc_news_andy'
  }
};

module.exports = config[env];
