const restify = require("restify");
const mongoose = require("mongoose");
const rjwt = require("restify-jwt-community");

const config = require("./config");
const customerRoutes = require("./routes/v1/customerController");
const userRoutes = require("./routes/v1/userController");

const server = restify.createServer();

// Middleware
// You need the bodyparser as with Express.js
// In order to find it you need to access the family of plugins
server.use(restify.plugins.bodyParser());

// Protect Routes
server.use(rjwt({secret: config.JWT_SECRET}).unless({ path: ["/v1/auth", "/v1/register", "/v1/customers/test"] }));

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on("error", error => {
  console.log(error);
});

db.once("open", () => {
  customerRoutes(server);
  userRoutes(server);
  console.log(`Server started on port ${config.PORT}`);
});
