const Notification = (props) => {
    const { message } = props;

    const successMessage = {
        color: "green",
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