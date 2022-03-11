import http from '../Http-common';

const getAll = () => {
    return http.get("/todo");
}
const get = (id) => {
    return http.get(`/todo/${id}`);
}
const create = (data) => {
    return http.post("/todo", data);
}
const update = (id, data) => {
    return http.put(`/todo/${id}`, data);
}
const remove = (id) => {
    return http.delete(`/todo/${id}`);
}
const removeAll = () => {
    return http.delete("/todo");
}
export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll
}