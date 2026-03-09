const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const blogsRouter = require("./controllers/blogs.js");
const middleware = require("./utils/middleware.js");

const app = express();

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler);

module.exports = app