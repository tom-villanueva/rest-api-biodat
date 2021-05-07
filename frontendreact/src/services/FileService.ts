import FileInterface from "../interfaces/FileInterface";
import http from "./HttpService";

const getAll = (project_id: number, item_id: number) => {
  return http.get(`/projects/${project_id}/items/${item_id}/measurements`);
};

const get = (project_id: number, item_id: number, files) => {
  // console.log("files: ", files);
  // console.log("url> ", `/projects/${project_id}/items/${item_id}/measurements/${files}`);
  return http.get(`/projects/${project_id}/items/${item_id}/measurements/${files}`);
};

const getModulus = (project_id: number, item_id: number, files) => {
  return http.get(`/projects/${project_id}/items/${item_id}/measurements/${files}/modulus`);
};

const getPhase = (project_id: number, item_id: number, files) => {
  return http.get(`/projects/${project_id}/items/${item_id}/measurements/${files}/phase`);
};

const create = (project_id: number, item_id: number, files) => {
  return http.post(`/projects/${project_id}/items/${item_id}/measurements`, files);
};

const remove = (project_id: number, item_id: number, files) => {
  return http.delete(`/projects/${project_id}/items/${item_id}/measurements/${files}`);
};

export default {
  getAll,
  get,
  getModulus,
  getPhase,
  create,
  remove,
};