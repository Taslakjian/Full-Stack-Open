import { useEffect, useState } from 'react';
import Filter from './Components/Filter';
import Form from './Components/Form';
import Person from './Components/Person';
import numbers from "./services/numbers";
import Notification from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

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

  const handleDelete = (person) => {
    const isConfirmed = confirm(`Delete ${person.name}`);

    if (isConfirmed) {
      numbers
      .deletePerson(person)
      .then(response => {
        const removedPerson = response.data;
        setPersons(persons.filter((person) => person.id != removedPerson.id));
        setErrorMessage(`Deleted ${removedPerson.name}.`);
        setSuccess(true);
        setTimeout(() => setErrorMessage(""), 4500);
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    const exactMatch = persons.find((person) => person.name === newName && person.number === newNumber);
    const nameMatch = persons.find((person) => person.name === newName && person.number !== newNumber);

    if (exactMatch) {
      alert(`${newName} is already added to phonebook`);
    } else if (nameMatch) {
        const isConfirmed = confirm(`${nameMatch.name} is already added to phonebook, replace the old number with a new one?`);
        const updatedPerson = { ...nameMatch, number: newNumber };

        if (isConfirmed) {
          numbers
            .update(updatedPerson)
            .then(response => {
              setPersons(persons.map((person) => person.id === updatedPerson.id ? updatedPerson : person ));
              setErrorMessage(`Updated ${updatedPerson.name}.`);
              setSuccess(true);
              setTimeout(() => setErrorMessage(""), 4500);
            })
            .catch((error) => {
              setErrorMessage(`Information of ${updatedPerson.name} has already been removed from server.`);
              setSuccess(false);
              setTimeout(() => setErrorMessage(""), 4500);
            });
        }
    } else {
        numbers
          .create(newPerson)
          .then((response) => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
            setErrorMessage(`Added ${response.data.name}.`);
            setSuccess(true);
            setTimeout(() => setErrorMessage(""), 4500);
          });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={success} />
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
        ? persons.map((person) => {
            return (
              <Person
                key={person.id} 
                name={person.name} 
                number={person.number}
                handleDelete={() => handleDelete(person)}
              />
            )
        })
        : list.map((person) => {
            return (
              <Person
                key={person.id} 
                name={person.name} 
                number={person.number}
                handleDelete={() => handleDelete(person)}
              />
           )
        })
      }
    </div>
  )
}

export default App
