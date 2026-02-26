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
  response.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(result => response.status(200).json(result))
});

app.post("/api/persons", (request, response) => {
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
    .then((savedNote) => response.json(savedNote));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
