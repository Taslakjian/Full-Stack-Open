const Notification = (props) => {
    const { message, type } = props;

    const successMessage = {
        color: type ? "green" : "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    if (!message) {
        return null;
    }

    return <p style={successMessage}>{message}</p>
};

export default Notification;