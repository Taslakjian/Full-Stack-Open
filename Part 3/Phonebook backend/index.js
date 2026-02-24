const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person.js");
const { default: mongoose } = require("mongoose");

const app = express();

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.static("dist"));

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
  const id = request.params.id;
  const person = persons.find((person) => person.id == id);
  persons = persons.filter((person) => person.id !== id);

  response.status(200).json(person);
});

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 1000000 + 1000000);
  const body = request.body;
  const samePerson = persons.find((person) => person.name === body.name);

  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: "name/number is missing"
    });
  };

  if (samePerson) {
    return response.status(400).json({
      error: "name must be unique"
    });
  };

  const person = {
    id: String(id),
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
