import http from "./HttpService";
import ProjectInterface from "../interfaces/ProjectInterface";

const getAll = () => {
    return http.get(`/projects/`);
};

const get = (project_id: number) => {
    return http.get(`/projects/${project_id}`);
};

const create = (project: ProjectInterface) => {
    return http.post(`/projects/`, project);
};

const update = (project: ProjectInterface) => {
    return http.put(`/projects/${project.id}`, project);
};

const remove = (project: ProjectInterface) => {
    return http.delete(`/projects/${project.id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};