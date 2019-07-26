const errors = require("restify-errors");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const User = mongoose.model("User"); // This is the same ORM object, don't instantiate a new one

exports.authenticate = async (email, password) => {
    try {
        const user = await User.findOne({email}); // Get user by email
        if (await bcryptjs.compare(password, user.password)) { // Match Password
            return user;
        } else {
            return new errors.InternalError("Authentication failed")
        }
    } catch (error) {
        return new errors.InternalError("Authentication failed")
    }
}
