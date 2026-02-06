const Country = (props) => {
    if (!props.chosenCountry) {
        return null;
    }

    const { chosenCountry } = props;
    const { name, capital, area, languages, flags } = chosenCountry;

    const iterableLanguages = Object.values(languages);

    return (
        <>
            <h1>{name.common}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <h2>Languages</h2>
            <ul>
                {
                    iterableLanguages.map((lang) => <li key={lang}>{lang}</li>)
                }
            </ul>
            <img src={flags.png} alt={`Flag of ${name.common}`} />
        </>
    )
};

export default Country;