import FileInterface from "../interfaces/FileInterface";
import http from "./HttpService";

const getAll = (project_id: number, files: FileInterface[]) => {
  return http.get(`/projects/${project_id}/items/${files[0].item_id}/measurements`);
};

const get = (project_id: number, files: FileInterface[]) => {
  return http.get(`/projects/${project_id}/items/${files[0].item_id}/measurements/${files[0].id}`);
};

const create = (project_id: number, files: FileInterface[]) => {
  return http.post(`/projects/${project_id}/items/${files[0].item_id}/measurements`, files);
};

const remove = (project_id: number, files: FileInterface[]) => {
  return http.delete(`/projects/${project_id}/items/${files[0].item_id}/measurements/`);
};

export default {
  getAll,
  get,
  create,
  remove,
};

// const getItemFiles = async (project_id: number, file: FileInterface[]) => {
  //   // const url = `/api/projects/${project_id}/items/${item_id}/measurements`;

  //   // try{
  //   //   const response = await HttpService.get(url);
  //   //   return response;
  //   // }catch(error){
  //   //   console.error('Not able to fetch the item files');
  //   // }
  //   const options = {
  //     url : `${API_URL}/api/projects/${project_id}/items/${file[0].item_id}/measurements`,
  //     method : "GET" as const,
  //     data : {},
  //   }
  //   const response: AxiosResponse<any> = await useHttpService(options);
  //   return response;
  // }

  // const getFile = async (project_id: number, file: FileInterface[]) => {
  //   // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements/${measurement_id}`;
  //   // try{
  //   //   const response = await HttpService.get(url);
  //   //   return response;
  //   // }catch(error){
  //   //   console.error('Not able to fetch the file data');
  //   // }
  //   const options = {
  //     url : `${API_URL}/api/projects/${project_id}/items/${file[0].item_id}/measurements/${file[0].id}`,
  //     method : "GET" as const,
  //     data : {},
  //   }
  //   const response: AxiosResponse<any> = await useHttpService(options);
  //   return response;
  // }

  // const createFiles = async (project_id: number, filesData: FileInterface[]) => {
  //   // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements`;
  //   // try {
  //   //   const response = await HttpService.post(url, filesData);
  //   //   return response;
  //   // } catch (error) {
  //   //     console.error("Not able to create the files");
  //   // }
  //   const options = {
  //     url : `${API_URL}/api/projects/${project_id}/items/${filesData[0].item_id}/measurements/`,
  //     method : "POST" as const,
  //     data : filesData,
  //   }
  //   const response: AxiosResponse<any> = await useHttpService(options);
  //   return response;
  // }

  // const deleteFiles = async (project_id: number, file: FileInterface[]) => {
  //   // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements/${measurement_id}`;
  //   // try {
  //   //   const response = await HttpService.delete(url);
  //   //   return response;
  //   // } catch (error) {
  //   //     console.error("Not able to delete the item");
  //   // }
  //   const options = {
  //     url : `${API_URL}/api/projects/${project_id}/items/${file[0].item_id}/measurements/`,
  //     method : "DELETE" as const,
  //     data : {},
  //   }