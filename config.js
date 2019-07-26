module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  URL: process.env.URL || "http://localhost:3000",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/acme",
  JWT_SECRET: process.env.JWT_SECRET || "keyboard cat"
};
