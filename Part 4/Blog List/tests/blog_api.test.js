const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const Blog = require("../models/blog.js");
const assert = require("node:assert");
const helper = require("./test_helper.js");

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
            
            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

            const blogsAfterDeletion = await helper.blogsInDB();
            const ids = blogsAfterDeletion.map(blog => blog.id);

            assert(!ids.includes(blogToDelete.id));

            assert.strictEqual(blogsAfterDeletion.length, helper.initialBlogs.length - 1);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});