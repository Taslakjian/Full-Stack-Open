import Country from "./Country";

const List = (props) => {
    const { country, displayedCountries, handleClick } = props;

    if (!country) {
        return null;
    } else if (displayedCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <>
            {
               displayedCountries.map((country) => {
                return (
                    <Country 
                        key={country} 
                        country={country}
                        handleClick={handleClick} 
                    />
                )
               }) 
            }
        </>
    )
}

export default List;