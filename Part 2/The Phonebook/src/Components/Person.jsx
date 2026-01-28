const Person = (props) => {
    const { name, number } = props;
    return <p>{name} {number}</p>
};

export default Person;