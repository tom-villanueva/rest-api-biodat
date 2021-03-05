import { useHttpService } from "./HttpService";

const API_URL = 'http://localhost:3333';

class ProjectService{
    

    async getProjectItems(project_id: number) {
        // const url = `${API_URL}/api/projects/${project_id}/items`;
        // // const history = useHistory();
        // //return axios.get(url).then(response => response.data);
        // try {
        //     const response = await HttpService.get(url);
        //     console.log("respuesta en get ", response);
        //     return response;
        // } catch (error) {
        //     // history.replace(history.location.pathname, { 
        //     //     errorStatusCode: error 
        //     // });
        //     console.error("error", error);
        //     console.error("Not able to fetch the project items");
        // }
        const options = {
            url : `${API_URL}/api/projects/${project_id}/items`,
            method : "GET" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }

    async getItem(project_id: number, item_id: number) {
        // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
        // //return axios.get(url).then(response => response.data);
        // try {
        //     const response = await HttpService.get(url);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to fetch the item");
        // }
        const options = {
            url : `${API_URL}/api/projects/${project_id}/items/${item_id}`,
            method : "GET" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }

    async deleteItem(project_id: number, item_id: number){
        // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
        // //return axios.delete(url);
        // try {
        //     const response = await HttpService.delete(url);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to delete the item");
        // }
        const options = {
            url : `${API_URL}/api/projects/${project_id}/items/${item_id}`,
            method : "DELETE" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }

    async createItem(project_id: number, itemData){
        // const url = `${API_URL}/api/projects/${project_id}/items`;
        // //return axios.post(url,project);
        // try {
        //     const response = await HttpService.post(url, itemData);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to create the item");
        // }
        const options = {
            url : `${API_URL}/api/projects/${project_id}/items/}`,
            method : "POST" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }

    async updateItem(project_id: number, item_id: number, itemData){
        // const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
        // //return axios.put(url,project);
        // try {
        //     const response = await HttpService.put(url, itemData);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to fetch the item");
        // }
        const options = {
            url : `${API_URL}/api/projects/${project_id}/items/${item_id}`,
            method : "PUT" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }
}

export default new ProjectService();