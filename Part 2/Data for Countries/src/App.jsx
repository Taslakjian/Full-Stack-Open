import { useEffect, useState } from "react";
import countrySearch from "./services/countrySearch";
import Search from "./components/Search";
import List from "./components/List";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [chosenCountry, setChosenCountry] = useState(null);

  const displayedCountries = countries.filter((singleCountry) => singleCountry.includes(country));

  useEffect(() => {
    countrySearch
      .getAll()
      .then((response) => {
        const data = response.data;
        setCountries(data.map((country) => country.name.common));
      });
  }, []);

  useEffect(() => {
    if (displayedCountries.length === 1) {
      countrySearch
        .getCountry(displayedCountries[0])
        .then(response => {
          setChosenCountry(response.data);
        });
    }
  }, [country]);

  const handleNewCountry = (event) => {
    const newCountry = event.target.value;
    setCountry(newCountry);
  };

  return (
    <>
      <Search country={country} handleNewCountry={handleNewCountry} />
      {
        displayedCountries.length === 1
        ? <Country chosenCountry={chosenCountry} />
        : <List country={country} displayedCountries={displayedCountries} />
      }
      
    </>
  )
}

export default App;
