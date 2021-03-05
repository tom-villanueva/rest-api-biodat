import { useHttpService } from "./HttpService";

const API_URL = 'http://localhost:3333';

class FileService {

  async getItemFiles(project_id: number, item_id: number){
    // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements`;

    // try{
    //   const response = await HttpService.get(url);
    //   return response;
    // }catch(error){
    //   console.error('Not able to fetch the item files');
    // }
    const options = {
      url : `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements`,
      method : "GET" as const,
      data : {},
    }
    const response = useHttpService(options);
    return response;
  }

  async getFile(project_id: number, item_id: number, measurement_id: number){
    // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements/${measurement_id}`;
    // try{
    //   const response = await HttpService.get(url);
    //   return response;
    // }catch(error){
    //   console.error('Not able to fetch the file data');
    // }
    const options = {
      url : `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements/${measurement_id}`,
      method : "GET" as const,
      data : {},
    }
    const response = useHttpService(options);
    return response;
  }

  async createFiles(project_id: number, item_id: number, filesData){
    // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements`;
    // try {
    //   const response = await HttpService.post(url, filesData);
    //   return response;
    // } catch (error) {
    //     console.error("Not able to create the files");
    // }
    const options = {
      url : `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements/`,
      method : "POST" as const,
      data : {},
    }
    const response = useHttpService(options);
    return response;
  }

  async deleteFiles(project_id: number, item_id: number, measurement_id: number){
    // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements/${measurement_id}`;
    // try {
    //   const response = await HttpService.delete(url);
    //   return response;
    // } catch (error) {
    //     console.error("Not able to delete the item");
    // }
    const options = {
      url : `${API_URL}/api/projects/${project_id}/items/${item_id}/measurements/`,
      method : "DELETE" as const,
      data : {},
    }
    const response = useHttpService(options);
    return response;
  }
}

export default new FileService();