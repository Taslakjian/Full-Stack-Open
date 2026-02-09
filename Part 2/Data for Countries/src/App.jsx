import { useEffect, useState } from "react";
import countrySearch from "./services/countrySearch";
import Search from "./components/Search";
import List from "./components/List";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [chosenCountry, setChosenCountry] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const displayedCountries = countries.filter((singleCountry) => singleCountry.includes(country));

  useEffect(() => {
    if (displayedCountries.length === 1) {
      countrySearch
        .getCountry(displayedCountries[0])
        .then(response => {
          setChosenCountry(response.data);
        });
    } else {
      countrySearch
      .getAll()
      .then((response) => {
        const data = response.data;
        setCountries(data.map((country) => country.name.common));
      });
    }
  }, [country]);

  const handleNewCountry = (event) => {
    const newCountry = event.target.value;
    setCountry(newCountry);
    setShowInfo(false);
  };

  const handleClick = (country) => {
    countrySearch
      .getCountry(country)
      .then((response) => setChosenCountry(response.data));
    setShowInfo(true);
  };

  return (
    <>
      <Search country={country} handleNewCountry={handleNewCountry} />
      {
        (displayedCountries.length === 1 || showInfo)
        ? <CountryInfo chosenCountry={chosenCountry} />
        : <List 
            country={country} 
            displayedCountries={displayedCountries} 
            handleClick={handleClick}
          />
      }
      
    </>
  )
}

export default App;
