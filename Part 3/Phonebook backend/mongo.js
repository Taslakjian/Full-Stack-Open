const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://taslakjianmike_db_user:${password}@cluster0.tuuklov.mongodb.net/phonebook?appName=Cluster0`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
    const person = new Person({
        name: name,
        number: number
    });

    person
        .save()
        .then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`);
            mongoose.connection.close();
        });
} else {
    Person
        .find({})
        .then(result => {
            result.forEach((person) => {
                console.log(person);
                mongoose.connection.close();
            })
        });
}

mongoose.connect(url, { family: 4 });