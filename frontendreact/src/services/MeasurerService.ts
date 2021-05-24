import MeasurerInterface from "../interfaces/MeasurerInterface";
import http from "./HttpService";

const getAll = () => {
    return http.get(`/measurers/`);
};

const create = (measurer: MeasurerInterface) => {
    return http.post(`/measurers`, measurer);
};

// const update = (item: ItemInterface) => {
//     return http.put(`/projects/${item.project_id}/items/${item.id}`, item);
// };

// const remove = (item: ItemInterface) => {
//     return http.delete(`/projects/${item.project_id}/items/${item.id}`);
// };

export default {
    getAll,
    //get,
    create,
    //update,
    //remove,
};