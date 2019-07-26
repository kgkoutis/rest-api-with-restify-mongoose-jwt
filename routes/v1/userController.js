const errors = require("restify-errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const auth = require("../../auth");
const config = require("../../config");

module.exports = server => {
    // Register User
    // Test with curl -vX POST -d '{"email":"kostas@email.com", "password":"pa55w00rd"}' -H 'Content-Type: application/json' localhost:3000/v1/register
    server.post("/v1/register", async (req, res, next) => {
        // Check for JSON
        if (!req.is("application/json")) {
            return next(new errors.InternalError("Expects 'application/json'"));
        }

        const { email, password } = req.body;
        
        try {
            const user = await User.findOne({email}); // Get user by email
            // const user = await auth.authenticate(email, password);
            if (!user) {

                const user = new User({
                // the model contacts the collection for you -- the collection is called "users"
                email,
                password
                });
                
                const salt = await bcryptjs.genSalt(10); 
                const hash = await bcryptjs.hash(user.password, salt); 
                // Hash Password
                user.password = hash;
                // Save User
                await user.save(); // persist the changes
                res.send(201); // Everything is OK, something got created

                res.send({ msg: "User registered successfully" });
                return next();
            } else {
                return next(new errors.ExpectationFailedError("User already registered"));
            }
        } catch (error) {
            return next(new errors.InternalError(error.message));
        }
        // TODO: log in endpoint <26-07-19, yourname> //
        // TODO: confirm user with sending link to email <26-07-19, yourname> //
    });

    // Auth User
    // Test with curl -sX POST -d '{"email":"kostas@email.com", "password":"pa55w00rd"}' -H 'Content-Type: application/json' localhost:3000/v1/auth | jq -r '.token'
    // The latter will give the token
    server.post("/v1/auth", async (req, res, next) => {
       const { email, password }  = req.body;

        try {
            // Authenticate User -- you may need to console.log to see if authentication is working
            const user = await auth.authenticate(email, password);

            // Create JWT
            // We need to sign the token, the header and the payload, and set as options the expiration date, etc. We also need to convert it to json, otherwise it will fail.
            // The token needs to be signed with the secret so not to be tampered with after it has been signed
            const token = await jwt.sign(user.toJSON(), config.JWT_SECRET, {expiresIn: "15m"}); 

            // We want to retrieve the issuedAt and the expirationDate
            const { iat, exp } = jwt.decode(token);
            // Respond with token
            res.send({ iat, exp, token });
            res.send(200);

            return next();
        } catch (error) {
            // User unauthorized
            return next(new errors.UnauthorizedError(error));
        }
    });
};
