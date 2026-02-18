import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    return axios.get(baseUrl);
};

const create = (person) => {
    return axios.post(baseUrl, person);
};

const deletePerson = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`);
};

const update = (updatedPerson) => {
    return axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
};

export default { getAll, create, deletePerson, update };