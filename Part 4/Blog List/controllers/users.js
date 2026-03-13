const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const usersRouter = require("express").Router();

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    if (!password || password.length < 3) {
        return response.status(400).json({ error: "password must be at least 3 characters" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        name, 
        username,
        passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

module.exports = usersRouter;