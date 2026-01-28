import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);

  const handleNewPerson = (event) => {
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

      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filter === "" 
        ? persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
        : list.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App
