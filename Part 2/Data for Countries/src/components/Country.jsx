const Country = (props) => {
    const { country, handleClick } = props;

    return <p>{country} <button onClick={() => handleClick(country)}>Show</button></p>
};

export default Country;