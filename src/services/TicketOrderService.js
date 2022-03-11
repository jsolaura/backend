import http from '../Http-common';

const getAll = () => {
    return http.get("/ticket/order");
}
const get = (id) => {
    return http.get(`/ticket/order/${id}`);
}
const create = (data) => {
    return http.post("/ticket/order", data);
}
const update = (id, data) => {
    return http.put("/ticket/order/${id}", data);
}
const remove = (id) => {
    return http.delete(`/ticket/order/${id}`);
}
const removeAll = () => {
    return http.delete("/ticket/order");
}
export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll
}