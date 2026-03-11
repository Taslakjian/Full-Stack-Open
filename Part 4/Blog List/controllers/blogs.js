const Blog = require("../models/blog.js");
const blogsRouter = require("express").Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  await Blog.findByIdAndDelete(id);
  return response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const blogToUpdate = await Blog.findById(id);

  if (!blogToUpdate) {
    return response.status(404).end();
  }

  blogToUpdate.likes = body.likes;

  const newBlog = await blogToUpdate.save();
  response.json(newBlog);
});

module.exports = blogsRouter;