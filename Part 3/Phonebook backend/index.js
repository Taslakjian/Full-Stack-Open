const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person.js");
const { default: mongoose } = require("mongoose");

const app = express();

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/api/persons", (request, response) => {
    Person
      .find({})
      .then((people) => response.json(people));
});

app.get("/info", (request, response) => {
  Person
      .find({})
      .then((people) => {
        response.send(
          `<div>
            <p>Phonebook has info for ${people.length}</p>
            <p>${new Date()}</p>
          </div>`
        )
      });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person
    .findById(id)
    .then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: "name/number is missing"
    });
  };

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  Person
    .findById(id)
    .then((person) => {
      if(!person) {
        return response.status(404).end();
      }

      person.number = body.number;

      person
        .save()
        .then(updatedPerson => {
          response.json(updatedPerson);
        });
    })
    .catch(error => next(error));
})

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  return response.status(500).send({ error: `${error}` });
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
