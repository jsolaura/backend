import http from '../Http-common';

const getAll = () => {
    return http.get("/postItem");
}
const get = (id) => {
    return http.get(`/postItem/${id}`);
}
const create = (data) => {
    return http.post("/postItem", data);
}
const update = (id, data) => {
    return http.put("/postItem/${id}", data);
}
const remove = (id) => {
    return http.delete(`/postItem/${id}`);
}
const removeAll = () => {
    return http.delete("/postItem");
}
export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll
}