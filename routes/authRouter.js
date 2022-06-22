const express = require("express")
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

//SIGNUP Route -----------
authRouter.post("/signup", (req, res, next) => {
    // try to find a user with the provided username. (If it already exists, we want to tell them
    // that the username is already taken.)
    User.findOne({ username: req.body.username.toLowerCase() }, (err, existingUser) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        // If the db doesn't return "null" it means there's already a user with that username.  Send the error object to the global error handler on your server file.
        if (existingUser !== null) {
            res.status(403);
            return next(new Error("That username already exists!"));
        }
        // If the function reaches this point and hasn't returned already, we're safe
        // to create the new user in the database.
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            // If the user signs up, we might as well give them a token right now
            // So they don't then immediately have to log in as well
                                    //payload,            //secret
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.status(201).send({ success: true, user: user.withoutPassword(), token });
        });
    });
});

//LOGIN Route -----------
authRouter.post("/login", (req, res, next) => {
    // Try to find the user with the submitted username (lowercased)
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err);
        };
        // If that user isn't in the database OR the password is wrong:
        if (!user) {
            res.status(403);
            return next(new Error("Username or password are incorrect"));
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                return next(new Error("Username or password are incorrect"))
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error("Username or password are incorrect"))
            }
            // If username and password both match an entry in the database,
            // create a JWT! Add the user object as the payload and pass in the secret.
            // This secret is like a "password" for your JWT, so when you decode it
            // you'll pass the same secret used to create the JWT so that it knows
            // you're allowed to decode it.
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            // Send the res token back to the client app.
            return res.status(200).send({ token: token, user: user.withoutPassword(), success: true })
        })
    });
});


module.exports = authRouter;