const List = (props) => {
    const { country, displayedCountries } = props;

    if (!country) {
        return null;
    } else if (displayedCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <>
            {
               displayedCountries.map((country) => <p key={country}>{country}</p>) 
            }
        </>
    )
}

export default List;