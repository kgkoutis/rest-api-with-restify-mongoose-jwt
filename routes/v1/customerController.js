const errors = require("restify-errors");
const Customer = require("../../models/Customer");

module.exports = server => {
  // Execute curl -vX GET <config.URI>/v1/customers/test
  server.get("/v1/customers/test", (req, res, next) => {
    try {
      res.send({ msg: "test" });

      return next();
    } catch (error) {
      return next(new errors.InternalServerError(error));
    }
  });

  // Get Single Customer
  // Execute curl -vX GET <config.URI>/v1/customers/<some id>
  server.get("/v1/customers/:id", async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.send(customer);

      return next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });

  // Get Customers
  // Execute curl -vX GET <config.URI>/v1/customers
  server.get("/v1/customers/", async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);

      return next();
    } catch (error) {
      return next(new errors.InternalError(error));
    }
  });

  // Add Customer
  // Execute curl -vX POST -d '{"name":"Bob", "email":"bob@email.com", "balance":0}' -H 'Content-Type: application/json' <config.URI>/v1/customers/
  server.post("/v1/customers/", async (req, res, next) => {
    // Check for JSON
    if (!req.is("application/json")) {
      return next(new errors.InternalError("Expects 'application/json'"));
    }

    const { name, email, balance } = req.body;
    const customer = new Customer({
      // the model contacts the collection for you -- the collection is called "customers"
      name,
      email,
      balance
    });

    try {
      await customer.save(); // persist the changes
      res.send(201); // Everything is OK, something got created

      return next();
    } catch (error) {
      return next(new errors.InternalError(error.message));
    }
  });

  // Update Single Customer
  // Execute curl -vX PUT -d '{"name":"Bob", "email":"bob@anotheremail.com", "balance":0}' -H 'Content-Type: application/json' <config.URI>/v1/customers/<bob's id>
  server.put("/v1/customers/:id", async (req, res, next) => {
    // Check for JSON
    if (!req.is("application/json")) {
      return next(
        new errors.InternalError("Expects 'application/json'")
      );
    }

    try {
      await Customer.findOneAndUpdate({ _id: req.params.id }, req.body); // the model contacts the collection for you
      res.send(200);

      return next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });

  // Delete Single Customer
  // Execute curl -vX DELETE <config.URI>/v1/customers/<customer's id>
  server.del("/v1/customers/:id", async (req, res, next) => {
    try {
      await Customer.findOneAndRemove({ _id: req.params.id }); // the model contacts the collection for you
      res.send(204);

      return next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });
};
