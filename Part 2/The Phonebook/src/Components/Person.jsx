const Person = (props) => {
    const { name, number, handleDelete } = props;
    return (
        <p>
            {name} {number}
            <button onClick={handleDelete}>delete</button>
        </p>
    )
};

export default Person;