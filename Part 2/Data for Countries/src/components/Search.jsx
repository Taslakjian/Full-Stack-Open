const Search = (props) => {
    const { country, handleNewCountry } = props;
    return <div>find countries <input value={country} onChange={handleNewCountry} /></div>
};

export default Search;