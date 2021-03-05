import {useHttpService} from "./HttpService";
import { useHistory } from 'react-router-dom';

const API_URL = 'http://localhost:3333';

class ProjectService{

    async getProjects() {
        // const url = `${API_URL}/api/projects/`;
        //return axios.get(url).then(response => response.data);
        // try {
        //     const response = await HttpService.get(url);
        //     console.log("respuesta en get ", response);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to fetch the projects");
        // }
        const options = {
            url : `${API_URL}/api/projects/`,
            method : "GET" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }

    async getProject(pk) {
        // const url = `${API_URL}/api/projects/${pk}`;
        // return axios.get(url).then(response => response.data);
        // try {
        //     const response = await HttpService.get(url);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to fetch the Project");
        // }
        const options = {
            url : `${API_URL}/api/projects/${pk}`,
            method : "GET" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }

    async deleteProject(project){
        // const url = `${API_URL}/api/projects/${project.id}`;
        // return axios.delete(url);
        // try {
        //     const response = await HttpService.delete(url);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to delete the Project");
        // }
        const options = {
            url : `${API_URL}/api/projects/${project.id}`,
            method : "DELETE" as const,
            data : {},
        }
        const response = useHttpService(options);
        return response;
    }

    async createProject(project){
        // const url = `${API_URL}/api/projects/`;
        // return axios.post(url,project);
        // try {
        //     const response = await HttpService.post(url, project);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to create the Project");
        // }
        const options = {
            url : `${API_URL}/api/projects/`,
            method : "POST" as const,
            data : project,
        }
        const response = useHttpService(options);
        return response;
    }

    async updateProject(project){
        // const url = `${API_URL}/api/projects/${project.id}`;
        // //return axios.put(url,project);
        // try {
        //     const response = await HttpService.put(url, project);
        //     return response;
        // } catch (error) {
        //     console.error("Not able to fetch the Project");
        // }
        const options = {
            url : `${API_URL}/api/projects/${project.id}`,
            method : "PUT" as const,
            data : project,
        }
        const response = useHttpService(options);
        return response;
    }
}

export default new ProjectService();