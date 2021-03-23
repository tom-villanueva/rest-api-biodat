import FileInterface from "../interfaces/FileInterface";
import http from "./HttpService";

const getAll = (project_id: number, item_id: number) => {
  return http.get(`/projects/${project_id}/items/${item_id}/measurements`);
};

const get = (project_id: number, item_id: number, files) => {
  return http.get(`/projects/${project_id}/items/${item_id}/measurements/${files[0].id}`);
};

const create = (project_id: number, item_id: number, files) => {
  return http.post(`/projects/${project_id}/items/${item_id}/measurements`, files);
};

const remove = (project_id: number, item_id: number, files) => {
  return http.delete(`/projects/${project_id}/items/${item_id}/measurements/`);
};

export default {
  getAll,
  get,
  create,
  remove,
};