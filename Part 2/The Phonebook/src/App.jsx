import { useEffect, useState } from 'react';
import Filter from './Components/Filter';
import Form from './Components/Form';
import Person from './Components/Person';
import numbers from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    numbers
      .getAll()
      .then(response => setPersons(response.data));
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter);
    setList(persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())));
  };

  const addPerson = (event) => {
    event.preventDefault();
    let isIncluded = false;

    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        isIncluded = true;
      } 
    });

    if (!isIncluded) {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      numbers
        .create(newPerson)
        .then((response) => {
          const person = response.data;
          setPersons(persons.concat(person));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber} 
      />
      <h2>Numbers</h2>
      {
        filter === "" 
        ? persons.map((person) => <Person key={person.name} name={person.name} number={person.number} />)
        : list.map((person) => <Person key={person.name} name={person.name} number={person.number} />)
      }
    </div>
  )
}

export default App
