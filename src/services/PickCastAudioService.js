import http from '../Http-common';

const getAll = () => {
    return http.get("/pickCast/audio");
}
const get = (id) => {
    return http.get(`/pickCast/audio/${id}`);
}
const create = (data) => {
    return http.post("/pickCast/audio", data);
}
const update = (id, data) => {
    return http.put(`/pickCast/audio/${id}`, data);
}
const remove = (id) => {
    return http.delete(`/pickCast/audio/${id}`);
}
const removeAll = () => {
    return http.delete("/pickCast/audio");
}
export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll
}