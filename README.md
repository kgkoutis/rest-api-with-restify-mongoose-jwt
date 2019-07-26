# Rest API With Restify, Mongoose, JWT

## Instructions

1. Execute the following commands for mongodb (assuming docker)
```bash
docker run -p 27017:27017 mongo:latest
```

You can check if the above worked if you connect with [Robo 3T](https://robomongo.org) to http://localhost:27017. 
If you do go ahead and create a new database with name 'acme' (if you want another name you have to change it in the `config.js` file -- more on that later)

2. (Optional) Follow linting rules such as these ones [here](https://github.com/kgkoutis/eslint-prettier-airbnb-style/blob/master/README.md). If you want you can also clone the repo, by executing:

```bash
git clone git@github.com:kgkoutis/eslint-prettier-airbnb-style.git <name-of-the-repo>
```

***Be aware*** that this will result creating the repo from scratch, so e.g. this README.md file here will not be a part of it. It would be best if you ***carefully*** consolidate the differences in `index.js`,`package.json`, etc.

3. Execute inside your new project directoy:
```bash
npm i restify restify-errors mongoose mongoose-timestamp restify-jwt-community jsonwebtoken bcryptjs
npm i -D nodemon
touch index.js config.js
```

The entry point of the application is `index.js` and `config.js` is where the configuration of the application takes place.

As usual, change the scripts to the generated `package.json` file to:
```json
"scripts": {
    "start": "node --production index.js",
    "dev": "nodemon index.js"
},
```

(If you followed Step 2, consolidate differences by erasing the proposed "test" script and put in the ones above)

4. The files in the repo are such that if you start the server with `npm run dev` and execute:
```bash
curl -X GET http://localhost:3000/customers/test
```
you should get a message back of the form `{"msg":"test"}`. This would mean that you have a basic Rest API working!

## Understanding Node Modules
+ bcryptjs: creates a safe hash for the password
+ jsonwebtoken: creates the json token, the expiration date etc.
+ mongoose: ORM driver for MongoDB
+ mongoose-timestamp: allows timestamping on the CRUD operations on MongoDB
+ restify: minimalistic server like express.js for building Rest APIs 
+ restify-errors: useful Rest API errors
+ restify-jwt-community: authentication jwt middleware to protect endpoints. Checks if the token is present in the request to check if user is authenticated

