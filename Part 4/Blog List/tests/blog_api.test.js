const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const assert = require("node:assert");
const helper = require("./test_helper.js");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("when there are initially some notes saved", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(helper.initialBlogs);
    });

    test("all blogs are returned", async () => {
        const response = await api
                                .get("/api/blogs")
                                .expect("Content-Type", /application\/json/);
        
        assert.strictEqual(response.body.length, 2);
    });

    test("the unique identifier property of the blog posts is named id", async () => {
        const response = await api.get("/api/blogs");
        const blog = response.body[0];
        assert(blog.id);
        assert(!blog._id)
    });

    describe("addition of a note", () => {
        test("a blog post is successfuly created", async () => {
            const newBlog = {
                title: "This is a new blog post",
                author: "author",
                url: "www.test.com",
                likes: 7,
            };

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            const response = await api.get("/api/blogs");

            const titles = response.body.map(blog => blog.title);

            assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
            assert(titles.includes("This is a new blog post"));
        });

        test("likes is set to 0 if not specified", async () => {
            const newBlog = {
                title: "This is a blog post without any likes",
                author: "author",
                url: "www.test.com"
            };

            const response = await api
                                .post("/api/blogs")
                                .send(newBlog)
                                .expect(201)
                                .expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.likes, 0);
        });

        test("missing url or title properties in new blog posts send 400 Bad Request", async () => {
            const newBlog = {
                author: "Test author"
            };

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(400);
        });
    });

    describe("deletion of a note", () => {
        test("succeeds with status 204 if id is valid", async () => {
            const blogs = await helper.blogsInDB();
            const blogToDelete = blogs[0];
            
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204);

            const blogsAfterDeletion = await helper.blogsInDB();
            const ids = blogsAfterDeletion.map(blog => blog.id);

            assert(!ids.includes(blogToDelete.id));

            assert.strictEqual(blogsAfterDeletion.length, helper.initialBlogs.length - 1);
        });
    });

    describe("updating a note", () => {
        test("updating a note's likes field"), async () => {
            const newBlog = {
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 0
            };

            const blogs = await helper.blogsInDB();
            const blogToUpdate = blogs[0];

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(newBlog);

            const blogsAfterUpdate = await helper.blogsInDB();
            const updatedBlog = blogsAfterUpdate[0];

            assert.notEqual(blogToUpdate.likes, updatedBlog.likes)
            assert(updatedBlog.likes === 0);
        };
    });
});

describe("when there is initially one user saved", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("secret", 10);
        const rootUser = new User({
            username: "root",
            passwordHash
        });

        await rootUser.save();
    })

    describe("addition of a user", () => {
        test("missing or invalid password sends an error response", async () => {
            const invalidUser = {
                name: "Test",
                username: "test"
            };

            const usersBeforeAddition = await helper.usersInDB();

            const response = await api
                                .post("/api/users")
                                .send(invalidUser)
                                .expect(400);

            const usersAfterAddition = await helper.usersInDB();

            assert.strictEqual(response.body.error, "password must be at least 3 characters");
            assert.deepStrictEqual(usersBeforeAddition, usersAfterAddition);
        });

        test("username must be unique", async () => {
            const rootUser = {
                username: "root",
                password: "test",
                name: "test"
            };

            const usersBeforeAddition = await helper.usersInDB();

            const response = await api
                                .post("/api/users")
                                .send(rootUser)
                                .expect(400);

            const usersAfterAddition = await helper.usersInDB();

            assert.strictEqual(response.body.error, "username must be unique.");
            assert.deepStrictEqual(usersBeforeAddition, usersAfterAddition);
        });
    });
})

after(async () => {
    await mongoose.connection.close();
});