import HttpService from "./HttpService";
import { useHistory } from 'react-router-dom';

const API_URL = 'http://localhost:3333';

class ProjectService{
    

    async getProjectItems(project_id: number) {
        const url = `${API_URL}/api/projects/${project_id}/items`;
        // const history = useHistory();
        //return axios.get(url).then(response => response.data);
        try {
            const response = await HttpService.get(url);
            return response;
        } catch (error) {
            // history.replace(history.location.pathname, { 
            //     errorStatusCode: error 
            // });
            console.error(error)
            console.error("Not able to fetch the project items");
        }
    }

    async getItem(project_id: number, item_id: number) {
        const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
        //return axios.get(url).then(response => response.data);
        try {
            const response = await HttpService.get(url);
            return response;
        } catch (error) {
            console.error("Not able to fetch the item");
        }
    }

    async deleteItem(project_id: number, item_id: number){
        const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
        //return axios.delete(url);
        try {
            const response = await HttpService.delete(url);
            return response;
        } catch (error) {
            console.error("Not able to delete the item");
        }
    }

    async createItem(project_id: number, itemData){
        const url = `${API_URL}/api/projects/${project_id}/items`;
        //return axios.post(url,project);
        try {
            const response = await HttpService.post(url, itemData);
            return response;
        } catch (error) {
            console.error("Not able to create the item");
        }
    }

    async updateItem(project_id: number, item_id: number, itemData){
        const url = `${API_URL}/api/projects/${project_id}/items/${item_id}`;
        //return axios.put(url,project);
        try {
            const response = await HttpService.put(url, itemData);
            return response;
        } catch (error) {
            console.error("Not able to fetch the item");
        }
    }
}

export default new ProjectService();