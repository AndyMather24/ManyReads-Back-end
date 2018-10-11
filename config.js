let env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    DB_URL: 'mongodb://localhost:27017/Ncnews'
  },
  test: {
    DB_URL: 'mongodb://localhost:27017/Ncnewstest'
  }
};

module.exports = config[env];
